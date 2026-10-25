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
  year: number;
  decade: string;
  decadeUrl: string;
  tags: Array<{ tag: string; url: string }>;
  html: string;
}

async function getBooksFn(): Promise<Book[]> {
  const importMap = import.meta.glob<MarkdownModule>("#books/*/*.md");

  const bookPromises = Object.values(importMap).map(async (importBook): Promise<Book> => {
    const { attributes, html } = await importBook();

    const titleSort = attributes.title.replace(/^(?:the|a) /gi, "");

    const authorFullname = attributes.author.split(", ").reverse().join(" ");

    const decade = `${attributes.year.toString().slice(0, 3)}0s`;

    return {
      title: attributes.title,
      titleSort,
      titleUrl: `/title/${kebabCase(attributes.title)}`,
      authorSort: attributes.author,
      authorFullname,
      authorUrl: `/author/${kebabCase(authorFullname)}`,
      series: attributes.series,
      seriesUrl: attributes.series && `/series/${kebabCase(attributes.series)}`,
      year: attributes.year,
      decade,
      decadeUrl: `/year/${decade}`,
      tags: attributes.tags.map((tag) => ({
        tag,
        url: `/tag/${kebabCase(tag)}`,
      })),
      html,
    };
  });

  return Promise.all(bookPromises);
}

export const getBooks = memoize(getBooksFn);
