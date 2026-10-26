import { kebabCase } from "es-toolkit/string";
import type { MarkdownModule } from "./MarkdownTypes";
import { memoize } from "es-toolkit";

export interface Book {
  title: string;
  titleSort: string;
  titleUrl: string;
  authorSort: string;
  authorFullname: string;
  authorUrl: string;
  series?: string;
  seriesUrl?: string;
  published: number;
  decadeDescription: string;
  decadeUrl: string;
  tags: Array<{ tag: string; url: string }>;
  read: Array<{ description: string; url: string }>;
  html: string;
}

async function getBooksFn(): Promise<Book[]> {
  const importMap = import.meta.glob<MarkdownModule>("#books/*/*.md");

  const bookPromises = Object.values(importMap).map(async (importBook): Promise<Book> => {
    const { attributes, html } = await importBook();

    const titleSort = attributes.title.replace(/^(?:the|a) /gi, "");

    const authorFullname = attributes.author.split(", ").reverse().join(" ");

    const decade3 = attributes.published.toString().slice(0, 3);
    const decadeDescription = `Published ${decade3}0–${decade3}9`;

    return {
      title: attributes.title,
      titleSort,
      titleUrl: `/title/${kebabCase(attributes.title)}`,
      authorSort: attributes.author,
      authorFullname,
      authorUrl: `/author/${kebabCase(authorFullname)}`,
      series: attributes.series,
      seriesUrl: attributes.series && `/series/${kebabCase(attributes.series)}`,
      published: attributes.published,
      decadeDescription: decadeDescription,
      decadeUrl: `/published/${decade3}0s`,
      tags: toArray(attributes.tags).map((tag) => ({
        tag,
        url: `/tag/${kebabCase(tag)}`,
      })),
      read: toArray(attributes.read).map((year) => ({
        description: `Read in ${year}`,
        url: `/read/${year}`,
      })),
      html,
    };
  });

  return Promise.all(bookPromises);
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
