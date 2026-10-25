import { useData } from "vike-react/useData";
import { BookList } from "../../../components/BookList.js";
import type { Data } from "./+data.js";

export default function Page() {
  const { year, books } = useData<Data>();

  return (
    <>
      <h1>Read in {year}</h1>
      <BookList books={books} />
    </>
  );
}
