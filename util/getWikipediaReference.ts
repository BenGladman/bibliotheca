import { memoize } from "es-toolkit/function";

interface Reference {
  pageId: number;
  title: string;
  extract: string[];
  cite: string;
}

async function getReferencesFn(): Promise<ReadonlyMap<number, Reference>> {
  const importMap = import.meta.glob<Reference>("#references/wikipedia/*.json");

  const referencesMap = new Map<number, Reference>();

  for (const importReference of Object.values(importMap)) {
    const reference = await importReference();
    referencesMap.set(reference.pageId, {
      ...reference,
      cite: `https://en.wikipedia.org/?curid=${reference.pageId}`,
    });
  }

  return referencesMap;
}

const getReferences = memoize(getReferencesFn);

export async function getWikipediaReference(
  pageId: number | undefined,
): Promise<Reference | undefined> {
  if (pageId) {
    const extracts = await getReferences();
    return extracts.get(pageId);
  }

  return undefined;
}
