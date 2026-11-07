import { useConfig } from "vike-react/useConfig";
import { getBooks } from "#util";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  config({
    title: "Authors",
  });

  const books = await getBooks();

  const authors = Map.groupBy(books, (b) => b.authorUrl)
    .values()
    .map((value) => ({ ...value[0], count: value.length }))
    .toArray()
    .sort((a, b) => a.authorSort.localeCompare(b.authorSort));

  return { authors };
}
