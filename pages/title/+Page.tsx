import { useData } from "vike-react/useData";
import { BookList, Header } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { title, books } = useData<Data>();

  return (
    <>
      <Header>
        <h1>{title}</h1>
      </Header>
      <BookList books={books} getSectionName={(b) => b.titleFirstLetter} />;
    </>
  );
}
