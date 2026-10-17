import type { PageContextServer } from "vike/types";
import { useConfig } from "vike-react/useConfig";
import { render } from "vike/abort";
import { MarkdownModule, parseBookPath } from "#util";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
  const config = useConfig();

  const booksImport = import.meta.glob<MarkdownModule>("#books/*/*.md");

  const bookModules: MarkdownModule[] = [];

  for (const [path, importModule] of Object.entries(booksImport)) {
    if (parseBookPath(path).author === pageContext.routeParams.author) {
      const bookModule = await importModule();
      bookModules.push(bookModule);
    }
  }

  if (bookModules.length === 0) {
    throw render(404);
  }

  config({
    title: `${bookModules[0].attributes.author}`,
  });

  return { attributes: bookModules[0].attributes };
}
