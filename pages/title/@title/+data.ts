import { useConfig } from "vike-react/useConfig";
import { render } from "vike/abort";
import { getBooks, getWikiExtract } from "#util";

import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
  const config = useConfig();

  const books = await getBooks();

  const filteredBooks = books.filter((b) => b.titleUrl === pageContext.urlPathname);

  if (filteredBooks.length === 0) {
    throw render(404);
  }

  const book = filteredBooks[0];

  config({
    title: `${book.title} – ${book.authorFullname}`,
  });

  const wikiExtract = await getWikiExtract(book.wikiPageId);

  return { book, wikiExtract };
}
