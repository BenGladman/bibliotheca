import { useData } from "vike-react/useData";
import { BookList } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { books } = useData<Data>();

  return (
    <>
      <header>
        <h1>{books[0].decadeDescription}</h1>
      </header>
      <BookList books={books} isYearPage getSectionName={(b) => `${b.published}`} />
    </>
  );
}
