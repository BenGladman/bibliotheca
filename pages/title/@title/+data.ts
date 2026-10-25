import { getBooks } from "#util";
import { useConfig } from "vike-react/useConfig";
import { render } from "vike/abort";
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
  const config = useConfig();

  const books = await getBooks();
  const filteredBooks = books.filter((b) => b.titleUrl === pageContext.urlPathname);

  if (filteredBooks.length === 0) {
    throw render(404);
  }

  config({
    title: `${filteredBooks[0].title} – ${filteredBooks[0].authorFullname}`,
  });

  return filteredBooks[0];
}
