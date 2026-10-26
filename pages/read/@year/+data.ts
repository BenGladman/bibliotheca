import { getBooks } from "#util";
import { useConfig } from "vike-react/useConfig";
import { render } from "vike/abort";
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
  const config = useConfig();

  const books = await getBooks();
  const filteredBooks = books.filter((b) => b.read.some((t) => t.url === pageContext.urlPathname));

  if (filteredBooks.length === 0) {
    throw render(404);
  }

  filteredBooks.sort((a, b) => a.titleSort.localeCompare(b.titleSort));

  const readDescription = filteredBooks[0].read.find(
    (t) => t.url === pageContext.urlPathname,
  )?.description;

  config({
    title: readDescription,
  });

  return { readDescription, books: filteredBooks };
}
