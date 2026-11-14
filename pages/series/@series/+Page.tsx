import { useData } from "vike-react/useData";
import { BookList, Link } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { books } = useData<Data>();

  return (
    <>
      <header>
        <h1>{books[0].series}</h1>
        <h3>
          <Link href={books[0].authorUrl}>{books[0].authorFullname}</Link>
        </h3>
      </header>
      <BookList books={books} isAuthorPage />
    </>
  );
}
