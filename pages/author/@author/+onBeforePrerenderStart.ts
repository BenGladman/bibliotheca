import { parseBookPath } from "#util";

export async function onBeforePrerenderStart() {
  const books = import.meta.glob("#books/*/*.md");

  const authorUrls = new Set(
    Object.keys(books).map((path) => {
      const { author } = parseBookPath(path);
      return `/author/${author}`;
    }),
  );

  return [...authorUrls];
}
