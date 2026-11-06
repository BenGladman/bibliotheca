import { getBooks } from "#util";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  const books = await getBooks();

  const locationsMap = new Map(books.flatMap((b) => b.locations.map((tag) => [tag.url, tag])));

  config({
    title: "Locations",
  });

  const locations = [...locationsMap.values()];
  locations.sort((a, b) => a.location.localeCompare(b.location));

  return { locations };
}
