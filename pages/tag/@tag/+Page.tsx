import { useData } from "vike-react/useData";
import { BookList } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { tag, books } = useData<Data>();

  return (
    <>
      <header>
        <h1>{tag}</h1>
      </header>
      <BookList books={books} isAuthorPage getSectionName={(b) => b.authorFullname} />
    </>
  );
}
