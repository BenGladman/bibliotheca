import { useData } from "vike-react/useData";
import { BookList } from "../../../components/BookList.js";
import type { Data } from "./+data.js";

export default function Page() {
  const { location, books } = useData<Data>();

  return (
    <>
      <h1>{location}</h1>
      <BookList books={books} />
    </>
  );
}
