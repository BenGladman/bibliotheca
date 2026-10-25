import { getBooks } from "#util";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  const books = await getBooks();

  const decadesMap = new Map(
    books.map((b) => [b.decadeUrl, { url: b.decadeUrl, decade: b.decade }]),
  );

  config({
    title: "Years",
  });

  const decades = [...decadesMap.values()];
  decades.sort((a, b) => a.decade.localeCompare(b.decade));

  return { decades };
}
