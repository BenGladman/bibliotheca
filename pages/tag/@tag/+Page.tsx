import { useData } from "vike-react/useData";
import { BookList, Header } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { tag, books } = useData<Data>();

  return (
    <>
      <Header>
        <h1>{tag}</h1>
      </Header>
      <BookList books={books} isAuthorPage getSectionName={(b) => b.authorFullname} />
    </>
  );
}
