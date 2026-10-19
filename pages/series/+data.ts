import { getBooks } from "#util";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data() {
  const config = useConfig();

  const books = await getBooks();

  const seriesMap = new Map(
    books
      .filter((b) => b.seriesUrl !== undefined)
      .map((b) => [
        b.seriesUrl!,
        {
          series: b.series!,
          url: b.seriesUrl!,
        },
      ]),
  );

  config({
    title: "Series",
  });

  const series = [...seriesMap.values()];
  series.sort((a, b) => a.series.localeCompare(b.series));

  return { series };
}
