import { getBooks } from "#util";
import { isNotNil } from "es-toolkit";

export async function onBeforePrerenderStart() {
  const books = await getBooks();
  const seriesUrls = new Set(books.map((b) => b.seriesUrl).filter(isNotNil));

  return [...seriesUrls];
}
