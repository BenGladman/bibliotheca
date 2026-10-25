import { useData } from "vike-react/useData";
import { BookList } from "../../components/BookList.js";
import type { Data } from "./+data.js";

export default function Page() {
  const { books } = useData<Data>();

  return <BookList books={books} />;
}
