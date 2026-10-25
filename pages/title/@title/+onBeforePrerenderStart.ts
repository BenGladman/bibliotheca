import { getBooks } from "#util";

export async function onBeforePrerenderStart() {
  const books = await getBooks();
  const bookUrls = new Set(books.map((b) => b.titleUrl));

  return [...bookUrls];
}
