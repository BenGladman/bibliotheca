import { getBooks } from "#util";

export async function onBeforePrerenderStart() {
  const books = await getBooks();
  const locationUrls = new Set(books.flatMap((b) => b.locations.map((t) => t.url)));

  return [...locationUrls];
}
