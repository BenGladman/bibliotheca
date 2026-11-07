import { useConfig } from "vike-react/useConfig";
import { render } from "vike/abort";
import { getBooks } from "#util";

import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
  const config = useConfig();

  const books = await getBooks();
  const filteredBooks = books.filter((b) =>
    b.locations.some((t) => t.url === pageContext.urlPathname),
  );

  if (filteredBooks.length === 0) {
    throw render(404);
  }

  const location = filteredBooks[0].locations.find(
    (t) => t.url === pageContext.urlPathname,
  )?.location;

  config({
    title: `${location}`,
  });

  return { location, books: filteredBooks };
}
