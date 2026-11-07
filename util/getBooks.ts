import { kebabCase } from "es-toolkit/string";
import type { MarkdownModule } from "./MarkdownTypes";
import { memoize } from "es-toolkit";

export interface Book {
  title: string;
  titleSort: string;
  titleUrl: string;
  titleFirstLetter: string;
  authorSort: string;
  authorFullname: string;
  authorUrl: string;
  authorFirstLetter: string;
  series?: string;
  seriesUrl?: string;
  published: number;
  decadeDescription: string;
  decadeUrl: string;
  tags: Array<{ tag: string; url: string }>;
  locations: Array<{ location: string; url: string }>;
  read: Array<{ year: number; description: string; url: string }>;
  html: string;
}

async function getBooksFn(): Promise<Book[]> {
  const importMap = import.meta.glob<MarkdownModule>("#books/*/*.md");

  const bookPromises = Object.values(importMap).map(async (importBook): Promise<Book> => {
    const { attributes, html } = await importBook();

    const titleSort = attributes.title.replace(/^(the|a|an)?\W+/gi, "");

    const authorFullname = attributes.author.split(", ").reverse().join(" ");

    const decade3 = attributes.published.toString().slice(0, 3);
    const decadeDescription = `Published ${decade3}0–${decade3}9`;

    return {
      title: attributes.title,
      titleSort,
      titleUrl: `/title/${urlCase(attributes.title)}`,
      titleFirstLetter: urlCase(titleSort)[0].toUpperCase(),
      authorSort: attributes.author,
      authorFullname,
      authorUrl: `/author/${urlCase(authorFullname)}`,
      authorFirstLetter: urlCase(attributes.author)[0].toUpperCase(),
      series: attributes.series,
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
    };
  });

  const books = await Promise.all(bookPromises);
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
