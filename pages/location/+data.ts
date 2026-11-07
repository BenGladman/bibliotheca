import { useConfig } from "vike-react/useConfig";
import { getBooks } from "#util";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  config({
    title: "Locations",
  });

  const books = await getBooks();

  const locations = Map.groupBy(
    books.flatMap((book) => book.locations),
    (value) => value.url,
  )
    .values()
    .map((value) => ({ ...value[0], count: value.length }))
    .toArray()
    .sort((a, b) => a.location.localeCompare(b.location));

  return { locations };
}
