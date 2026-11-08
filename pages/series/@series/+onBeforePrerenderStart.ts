import { isNotNil } from "es-toolkit/predicate";
import { getBooks } from "#util";

export async function onBeforePrerenderStart() {
  const books = await getBooks();
  const seriesUrls = new Set(books.map((b) => b.seriesUrl).filter(isNotNil));

  return [...seriesUrls];
}
