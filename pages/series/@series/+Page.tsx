import { useData } from "vike-react/useData";
import { BookList } from "../../../components/BookList.js";
import type { Data } from "./+data.js";

export default function Page() {
  const { books } = useData<Data>();

  return (
    <>
      <h1>{books[0].series}</h1>
      <BookList books={books} isAuthorPage />
    </>
  );
}
