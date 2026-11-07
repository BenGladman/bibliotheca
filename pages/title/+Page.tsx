import { useData } from "vike-react/useData";
import { BookList } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { books } = useData<Data>();

  return <BookList books={books} getSectionName={(b) => b.titleFirstLetter} />;
}
