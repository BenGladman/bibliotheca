import { getBooks } from "#util";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  const books = await getBooks();

  const decadesMap = new Map(
    books.map((b) => [
      b.decadeUrl,
      {
        url: b.decadeUrl,
        description: b.decadeDescription,
      },
    ]),
  );

  config({
    title: "Published",
  });

  const decades = [...decadesMap.values()];
  decades.sort((a, b) => a.description.localeCompare(b.description));

  return { decades };
}
