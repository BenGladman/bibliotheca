import type { PageContextServer } from "vike/types";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
  // https://vike.dev/useConfig
  const config = useConfig();

  const bookModule = await import(
    `#books/${pageContext.routeParams.author}/${pageContext.routeParams.title}.md`
  );

  const { attributes, html } = bookModule;

  config({
    // Set <title>
    title: `${attributes.title} - ${attributes.author}`,
  });

  return { attributes, html };
}
