import { useConfig } from "vike-react/useConfig";
import { getBooks } from "#util";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();
  const title = "Books by Title";
  config({ title });

  const allBooks = await getBooks();

  const booksMap = new Map(allBooks.map((b) => [b.titleUrl, b]));

  const books = [...booksMap.values()];

  return { title, books };
}
