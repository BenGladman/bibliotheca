import { memoize } from "es-toolkit/function";
import { chunk } from "es-toolkit/iterator";
import fs from "node:fs/promises";
import path from "node:path";
import { getBooks } from "./getBooks";

const cacheDir = path.resolve(import.meta.dirname, "../node_modules/.wiki-extract-cache");

function cachePath(pageId: number) {
  return path.join(cacheDir, `${pageId}.html`);
}

const extracts = new Map<number, string>();

async function fetchExtracts(pageIds: number[], continueParam?: any) {
  const pageIdsParam = pageIds.join("|");

  const searchParams = new URLSearchParams({
    action: "query",
    prop: "extracts",
    format: "json",
    exintro: "",
    pageids: pageIdsParam,
    ...continueParam,
  });

  console.log("Fetching Wikipedia extracts", pageIdsParam, continueParam);

  const response = await fetch(`https://en.wikipedia.org/w/api.php?${searchParams}`);

  if (response.ok) {
    const result = await response.json();
    if (result.query) {
      for (const pageId of pageIds) {
        const extract = result.query.pages[pageId]?.extract;
        if (extract) {
          await fs.writeFile(cachePath(pageId), extract, { encoding: "utf-8" });
          extracts.set(pageId, extract);
        }
      }

      if (result.continue) {
        await fetchExtracts(pageIds, result.continue);
      }
    } else {
      console.log("Fetch error response", result);
    }
  } else {
    console.log(
      "Fetch failed",
      response.status,
      response.statusText,
      response.headers.entries().toArray(),
    );
  }
}

async function getAllExtractsFn() {
  await fs.mkdir(cacheDir, { recursive: true });

  const books = await getBooks();

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

  const pageIdChunks = chunk(extractsToFetch.values(), 50);

  for (const pageIdsChunk of pageIdChunks) {
    await fetchExtracts(pageIdsChunk);
  }
}

const getAllExtracts = memoize(getAllExtractsFn);

export async function getWikiExtract(pageId: number | undefined) {
  if (pageId) {
    await getAllExtracts();
    return extracts.get(pageId);
  }

  return undefined;
}
