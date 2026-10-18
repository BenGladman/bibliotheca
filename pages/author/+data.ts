import { getBooks } from "#util";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  const books = await getBooks();

  const authorsMap = new Map(
    books.map((b) => [
      b.authorUrl,
      {
        sort: b.authorSort,
        fullname: b.authorFullname,
        url: b.authorUrl,
      },
    ]),
  );

  config({
    title: "Authors",
  });

  const authors = [...authorsMap.values()];
  authors.sort((a, b) => a.sort.localeCompare(b.sort));

  return { authors };
}
