import { getBooks } from "#util";

export async function onBeforePrerenderStart() {
  const books = await getBooks();
  const decadeUrls = new Set(books.map((b) => b.decadeUrl));

  return [...decadeUrls];
}
