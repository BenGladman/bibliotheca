import { useData } from "vike-react/useData";
import { BookList, Header } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { books } = useData<Data>();

  return (
    <>
      <Header>
        <h1>{books[0].decadeDescription}</h1>
      </Header>

      <BookList books={books} isYearPage getSectionName={(b) => `${b.published}`} />
    </>
  );
}
