import { useConfig } from "vike-react/useConfig";
import { getBooks } from "#util";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  config({
    title: "Tags",
  });

  const books = await getBooks();

  const tags = Map.groupBy(
    books.flatMap((book) => book.tags),
    (value) => value.url,
  )
    .values()
    .map((value) => ({ ...value[0], count: value.length }))
    .toArray()
    .sort((a, b) => a.tag.localeCompare(b.tag));

  return { tags };
}
