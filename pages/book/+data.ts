import { getBooks } from "#util";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  const allBooks = await getBooks();

  const booksMap = new Map(
    allBooks.map((b) => [
      b.titleUrl,
      {
        sort: b.titleSort,
        title: b.title,
        authorFullname: b.authorFullname,
        year: b.year,
        titleUrl: b.titleUrl,
        authorUrl: b.authorUrl,
      },
    ]),
  );

  config({
    title: "Books",
  });

  const books = [...booksMap.values()];
  books.sort((a, b) => a.sort.localeCompare(b.sort));

  return { books };
}
