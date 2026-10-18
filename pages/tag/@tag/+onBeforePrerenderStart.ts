import { getBooks } from "#util";

export async function onBeforePrerenderStart() {
  const books = await getBooks();
  const tagUrls = new Set(books.flatMap((b) => b.tags.map((t) => t.url)));

  return [...tagUrls];
}
