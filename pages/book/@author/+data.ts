import type { PageContextServer } from "vike/types";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
  // https://vike.dev/useConfig
  const config = useConfig();

  const bookModules = import.meta.glob("#books/*/*.md");

  const authorBooks: any[] = [];

  for (const [path, importModule] of Object.entries(bookModules)) {
    const author = path.match(/\/([^/]+)\/[^/]+\.md$/)?.[1];
    if (author === pageContext.routeParams.author) {
      console.log(pageContext.routeParams.author, path);

      const bookModule = await importModule();

      authorBooks.push(bookModule);
    }
  }

  config({
    // Set <title>
    title: `${authorBooks[0].attributes.author}`,
  });

  return { attributes: authorBooks[0].attributes };
}
