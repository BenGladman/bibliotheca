import { useData } from "vike-react/useData";
import { BookList } from "../../components/BookList.js";
import type { Data } from "./+data.js";

export default function Page() {
  const { books } = useData<Data>();

  return (
    <>
      <h1>Books</h1>
      <BookList books={books} getSectionName={(b) => b.titleFirstLetter} />
    </>
  );
}
