import { parseBookPath } from "#util";

export async function onBeforePrerenderStart() {
  const books = import.meta.glob("#books/*/*.md");

  const bookUrls = new Set(
    Object.keys(books).map((path) => {
      const { title } = parseBookPath(path);
      return `/book/${title}`;
    }),
  );

  return [...bookUrls];
}
