import { getBooks } from "#util";

export async function onBeforePrerenderStart() {
  const books = await getBooks();
  const readUrls = new Set(books.flatMap((b) => b.read.map((t) => t.url)));

  return [...readUrls];
}
