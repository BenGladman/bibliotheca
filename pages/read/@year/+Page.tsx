import { useData } from "vike-react/useData";
import { BookList, Header } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { readDescription, books } = useData<Data>();

  return (
    <>
      <Header>
        <h1>{readDescription}</h1>
      </Header>
      <BookList books={books} />
    </>
  );
}
