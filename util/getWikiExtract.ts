import { memoize } from "es-toolkit/function";

interface WikiExtract {
  pageId: number;
  extract: string;
}

async function getExtractsFn(): Promise<ReadonlyMap<number, string>> {
  const importMap = import.meta.glob<WikiExtract>("#references/wikipedia/*.json");

  const extractMap = new Map<number, string>();

  for (const importExtract of Object.values(importMap)) {
    const { pageId, extract } = await importExtract();
    extractMap.set(pageId, extract);
  }

  return extractMap;
}

const getExtracts = memoize(getExtractsFn);

export async function getWikiExtract(pageId: number | undefined): Promise<string | undefined> {
  if (pageId) {
    const extracts = await getExtracts();
    return extracts.get(pageId);
  }

  return undefined;
}
