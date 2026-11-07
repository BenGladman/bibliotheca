import { useConfig } from "vike-react/useConfig";
import { getBooks, type Book } from "#util";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  config({
    title: "Series",
  });

  const books = await getBooks();

  const booksInSeries = books.filter(
    (book): book is Book & { series: string; seriesUrl: string; seriesSort: string } =>
      book.seriesUrl !== undefined,
  );

  const series = Map.groupBy(booksInSeries, (b) => b.seriesUrl)
    .values()
    .map((value) => ({ ...value[0], count: value.length }))
    .toArray()
    .sort((a, b) => a.seriesSort.localeCompare(b.seriesSort));

  return { series };
}
