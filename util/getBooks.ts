import { memoize } from "es-toolkit/function";
import { kebabCase } from "es-toolkit/string";

import type { MarkdownModule } from "./MarkdownTypes";

export interface Book {
  readonly title: string;
  readonly titleSort: string;
  readonly titleUrl: string;
  readonly titleFirstLetter: string;
  readonly subTitle?: string;
  readonly authorSort: string;
  readonly authorFullname: string;
  readonly authorUrl: string;
  readonly authorFirstLetter: string;
  readonly series?: string;
  readonly seriesSort?: string;
  readonly seriesUrl?: string;
  readonly published: number;
  readonly decadeDescription: string;
  readonly decadeUrl: string;
  readonly tags: Array<{ tag: string; url: string }>;
  readonly locations: Array<{ location: string; url: string }>;
  readonly read: Array<{ year: number; description: string; url: string }>;
  readonly html: string;
  readonly wikiPageId?: number;
  readonly googleBookId?: string;
}

async function getBooksFn(): Promise<readonly Book[]> {
  const importMap = import.meta.glob<MarkdownModule>("#books/*/*.md");

  const bookPromises = Object.values(importMap).map(async (importBook): Promise<Book> => {
    const { attributes, html } = await importBook();

    const titleSort = sortName(attributes.title);
    const titleUrlSuffix = attributes.titleUrlSuffix ? `-${attributes.titleUrlSuffix}` : "";

    const authorFullname = attributes.author.split(", ").reverse().join(" ");

    const decade3 = attributes.published.toString().slice(0, 3);
    const decadeDescription = `Published ${decade3}0–${decade3}9`;

    return {
      title: attributes.title,
      titleSort,
      titleUrl: `/title/${urlCase(attributes.title)}${titleUrlSuffix}`,
      titleFirstLetter: urlCase(titleSort)[0].toUpperCase(),
      subTitle: attributes.subTitle,
      authorSort: attributes.author,
      authorFullname,
      authorUrl: `/author/${urlCase(authorFullname)}`,
      authorFirstLetter: urlCase(attributes.author)[0].toUpperCase(),
      series: attributes.series,
      seriesSort: attributes.series && sortName(attributes.series),
      seriesUrl: attributes.series && `/series/${urlCase(attributes.series)}`,
      published: attributes.published,
      decadeDescription: decadeDescription,
      decadeUrl: `/published/${decade3}0s`,
      tags: toArray(attributes.tags).map((tag) => ({
        tag,
        url: `/tag/${urlCase(tag)}`,
      })),
      locations: toArray(attributes.location).map((location) => ({
        location,
        url: `/location/${urlCase(location)}`,
      })),
      read: toArray(attributes.read).map((year) => ({
        year,
        description: `Read in ${year}`,
        url: `/read/${year}`,
      })),
      html,
      wikiPageId: attributes.wikiPageId,
      googleBookId: attributes.googleBookId,
    };
  });

  const books = await Promise.all(bookPromises);

  checkDuplicateTitleUrls(books);

  books.sort((a, b) => a.titleSort.localeCompare(b.titleSort));

  return books;
}

export const getBooks = memoize(getBooksFn);

function toArray<T>(value: T | T[] | undefined): T[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (value) {
    return [value];
  }

  return [];
}

function urlCase(value: string) {
  const lcValueWithDiacriticsRemoved = value
    .normalize("NFD")
    .toLowerCase()
    .replace(/[^a-z1-9\- ]/gu, "");
  return kebabCase(lcValueWithDiacriticsRemoved);
}

function sortName(value: string) {
  return value.replace(/^(the|a|an)?\W+/gi, "");
}

function checkDuplicateTitleUrls(books: Book[]) {
  const seen = new Set<string>();

  for (const book of books) {
    if (seen.has(book.titleUrl)) {
      throw new Error(
        `Error found duplicate title URL: ${book.titleUrl}. Use titleUrlSuffix property to make unique.`,
      );
    } else {
      seen.add(book.titleUrl);
    }
  }
}
