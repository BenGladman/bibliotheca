import { useConfig } from "vike-react/useConfig";
import { getBooks } from "#util";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  const allBooks = await getBooks();

  const booksMap = new Map(allBooks.map((b) => [b.titleUrl, b]));

  config({
    title: "Books",
  });

  const books = [...booksMap.values()];

  return { books };
}
