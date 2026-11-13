import { useConfig } from "vike-react/useConfig";
import { render } from "vike/abort";
import { getBooks } from "#util";

import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
  const config = useConfig();

  const books = await getBooks();
  const filteredBooks = books.filter((b) => b.tags.some((t) => t.url === pageContext.urlPathname));

  if (filteredBooks.length === 0) {
    throw render(404);
  }

  filteredBooks
    .sort((a, b) => a.published - b.published)
    .sort((a, b) => a.authorSort.localeCompare(b.authorSort));

  const tag = filteredBooks[0].tags.find((t) => t.url === pageContext.urlPathname)?.tag;

  config({
    title: `${tag}`,
  });

  return { tag, books: filteredBooks };
}
