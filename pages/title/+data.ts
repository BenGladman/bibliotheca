import { getBooks } from "#util";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  const allBooks = await getBooks();

  const booksMap = new Map(allBooks.map((b) => [b.titleUrl, b]));

  config({
    title: "Books",
  });

  const books = [...booksMap.values()];
  books.sort((a, b) => a.titleSort.localeCompare(b.titleSort));

  return { books };
}
