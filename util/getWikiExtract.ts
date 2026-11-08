import { memoize } from "es-toolkit/function";
import { chunk } from "es-toolkit/iterator";
import fs from "node:fs/promises";
import path from "node:path";
import { getBooks } from "./getBooks";

const cacheDir = path.resolve(import.meta.dirname, "../node_modules/.wiki-extract-cache");
console.log("!!!!!", cacheDir);

function cachePath(pageId: number) {
  return path.join(cacheDir, `${pageId}.html`);
}

async function getWikiExtractsFn() {
  await fs.mkdir(cacheDir, { recursive: true });

  const books = await getBooks();

  const extracts = new Map<number, string>();
  const extractsToFetch = new Set<number>();

  for (const { wikiPageId } of books) {
    if (wikiPageId) {
      try {
        const cached = await fs.readFile(cachePath(wikiPageId), {
          encoding: "utf8",
        });
        extracts.set(wikiPageId, cached);
      } catch {
        extractsToFetch.add(wikiPageId);
      }
    }
  }

  for (const pageIdsChunk of chunk(extractsToFetch.values(), 10)) {
    const pageIds = pageIdsChunk.join("|");
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&pageids=${pageIds}`,
    );
    if (response.ok) {
      const result = await response.json();
      for (const pageId of pageIdsChunk) {
        const extract = result.query.pages[pageId]?.extract;
        if (extract) {
          await fs.writeFile(cachePath(pageId), extract, { encoding: "utf-8" });
          extracts.set(pageId, extract);
        }
      }
    }
  }

  return extracts;
}

const getWikiExtracts = memoize(getWikiExtractsFn);

export async function getWikiExtract(pageId: number | undefined) {
  if (pageId) {
    return (await getWikiExtracts()).get(pageId);
  }

  return undefined;
}
