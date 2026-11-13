import { useData } from "vike-react/useData";
import { BookList } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { tag, books } = useData<Data>();

  return (
    <>
      <h1>{tag}</h1>
      <BookList books={books} isAuthorPage getSectionName={(b) => b.authorFullname} />
    </>
  );
}
