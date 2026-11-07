import { useData } from "vike-react/useData";
import { BookList, Link } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { books } = useData<Data>();

  return (
    <>
      <h1>{books[0].series}</h1>
      <h2>
        <Link href={books[0].authorUrl}>{books[0].authorFullname}</Link>
      </h2>
      <BookList books={books} isAuthorPage />
    </>
  );
}
