import { useConfig } from "vike-react/useConfig";
import { getBooks } from "#util";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  config({
    title: "Published",
  });

  const books = await getBooks();

  const decades = Map.groupBy(books, (b) => b.decadeUrl)
    .values()
    .map((value) => ({ ...value[0], count: value.length }))
    .toArray()
    .sort((a, b) => a.decadeDescription.localeCompare(b.decadeDescription));

  return { decades };
}
