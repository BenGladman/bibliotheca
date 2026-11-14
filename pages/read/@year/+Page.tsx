import { useData } from "vike-react/useData";
import { BookList } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { readDescription, books } = useData<Data>();

  return (
    <>
      <header>
        <h1>{readDescription}</h1>
      </header>
      <BookList books={books} />
    </>
  );
}
