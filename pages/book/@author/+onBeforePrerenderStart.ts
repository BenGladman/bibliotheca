export async function onBeforePrerenderStart() {
  const books = import.meta.glob("#books/*/*.md");

  const authorUrls = new Set(
    Object.keys(books).map((path) => `/book/${path.match(/\/([^/]+)\/[^/]+\.md$/)?.[1]}`),
  );

  return [...authorUrls];
}
