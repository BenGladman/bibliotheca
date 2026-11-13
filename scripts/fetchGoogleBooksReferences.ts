import { chunk } from "es-toolkit/iterator";
import fs from "node:fs/promises";
import path from "node:path";
import { getBooks } from "#util";

const referenceDir = path.resolve(import.meta.dirname, "../references/google");

function referencePath(bookId: string) {
  return path.join(referenceDir, `${bookId}.json`);
}

function splitDescription(description: string): string[] {
  return description.split(/\n|(?=<br>)|(?<=<\/p>)/).filter((v) => v !== "");
}

async function fetchAllExtracts() {
  await fs.mkdir(referenceDir, { recursive: true });

  const books = await getBooks();

  const idsToFetch = new Set<string>();

  for (const { googleBookId } of books) {
    if (googleBookId) {
      try {
        await fs.stat(referencePath(googleBookId));
      } catch {
        idsToFetch.add(googleBookId);
      }
    }
  }

  const searchParams = new URLSearchParams({
    key: process.env.GOOGLE_API_KEY ?? "",
    projection: "lite",
  });

  for (const bookId of idsToFetch) {
    console.log("Fetching Google Books", bookId);

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${bookId}?${searchParams}`,
    );

    if (response.ok) {
      const result = await response.json();
      await fs.writeFile(
        referencePath(bookId),
        JSON.stringify(
          {
            bookId,
            title: result.volumeInfo.title,
            description: splitDescription(result.volumeInfo.description),
          },
          undefined,
          2,
        ),
        { encoding: "utf-8" },
      );
    } else {
      console.log(
        "Fetch failed",
        response.status,
        response.statusText,
        response.headers.entries().toArray(),
      );
    }
  }
}

await fetchAllExtracts();
