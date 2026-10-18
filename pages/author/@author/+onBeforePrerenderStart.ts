import { getBooks } from "#util";

export async function onBeforePrerenderStart() {
  const books = await getBooks();
  const authorUrls = new Set(books.map((b) => b.authorUrl));

  return [...authorUrls];
}
