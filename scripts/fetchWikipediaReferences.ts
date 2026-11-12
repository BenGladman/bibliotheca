import { chunk } from "es-toolkit/iterator";
import fs from "node:fs/promises";
import path from "node:path";
import { getBooks } from "#util";

const referenceDir = path.resolve(import.meta.dirname, "../references/wikipedia");

function referencePath(pageId: number) {
  return path.join(referenceDir, `${pageId}.json`);
}

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
          await fs.writeFile(
            referencePath(pageId),
            JSON.stringify({ pageId, extract }, undefined, 2),
            { encoding: "utf-8" }, //
          );
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

async function fetchAllExtracts() {
  await fs.mkdir(referenceDir, { recursive: true });

  const books = await getBooks();

  const extractsToFetch = new Set<number>();

  for (const { wikiPageId } of books) {
    if (wikiPageId) {
      try {
        await fs.stat(referencePath(wikiPageId));
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

await fetchAllExtracts();
