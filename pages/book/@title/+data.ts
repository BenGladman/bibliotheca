import type { PageContextServer } from "vike/types";
import { useConfig } from "vike-react/useConfig";
import { parseBookPath, type MarkdownModule } from "#util";
import { render } from "vike/abort";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
  const config = useConfig();

  const booksImport = import.meta.glob<MarkdownModule>("#books/*/*.md");

  const bookModules: MarkdownModule[] = [];

  for (const [path, importModule] of Object.entries(booksImport)) {
    if (parseBookPath(path).title === pageContext.routeParams.title) {
      const bookModule = await importModule();
      bookModules.push(bookModule);
    }
  }

  if (bookModules.length === 0) {
    throw render(404);
  }

  const { attributes, html } = bookModules[0];

  config({
    title: `${attributes.title} - ${attributes.author}`,
  });

  return { attributes, html };
}
