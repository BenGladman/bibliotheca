import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";
import { BookList } from "../../../components/BookList.js";

export default function Page() {
  const { tag, books } = useData<Data>();

  return (
    <>
      <h1>{tag}</h1>

      <BookList books={books} />
    </>
  );
}
