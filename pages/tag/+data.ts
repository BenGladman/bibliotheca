import { getBooks } from "#util";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  const books = await getBooks();

  const tagsMap = new Map(books.flatMap((b) => b.tags.map((tag) => [tag.url, tag])));

  config({
    title: "Tags",
  });

  const tags = [...tagsMap.values()];
  tags.sort((a, b) => a.tag.localeCompare(b.tag));

  return { tags };
}
