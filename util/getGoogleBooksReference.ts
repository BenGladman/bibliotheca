import { memoize } from "es-toolkit/function";

interface Reference {
  bookId: string;
  title: string;
  description: string;
  cite: string;
}

async function getReferencesFn() {
  const importMap = import.meta.glob<Reference>("#references/google/*.json");

  const referencesMap = new Map<string, Reference>();

  for (const importReference of Object.values(importMap)) {
    const reference = await importReference();
    referencesMap.set(reference.bookId, {
      ...reference,
      cite: `https://www.google.co.uk/books/edition/_/${reference.bookId}`,
    });
  }

  return referencesMap;
}

const getReferences = memoize(getReferencesFn);

export async function getGoogleBooksReference(
  bookId: string | undefined,
): Promise<Reference | undefined> {
  if (bookId) {
    const references = await getReferences();
    return references.get(bookId);
  }

  return undefined;
}
