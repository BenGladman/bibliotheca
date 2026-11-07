import { useConfig } from "vike-react/useConfig";
import { getBooks } from "#util";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  config({
    title: "Read",
  });

  const books = await getBooks();

  const reads = Map.groupBy(
    books.flatMap((book) => book.read),
    (value) => value.url,
  )
    .values()
    .map((value) => ({ ...value[0], count: value.length }))
    .toArray()
    .sort((a, b) => a.description.localeCompare(b.description));

  return { reads };
}
