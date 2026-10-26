import { getBooks } from "#util";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  const books = await getBooks();

  const tagsMap = new Map(books.flatMap((b) => b.read.map((read) => [read.url, read])));

  config({
    title: "Read",
  });

  const reads = [...tagsMap.values()];
  reads.sort((a, b) => b.description.localeCompare(a.description));

  return { reads };
}
