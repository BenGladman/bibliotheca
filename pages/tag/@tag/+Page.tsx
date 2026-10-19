import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";

export default function Page() {
  const { tag, books } = useData<Data>();

  return (
    <>
      <h1>{tag}</h1>

      <ol>
        {books.map((b) => (
          <li key={b.title}>
            <Link href={b.titleUrl}>{b.title}</Link>
            <span> – </span>
            <Link href={b.authorUrl}>{b.authorFullname}</Link>
            <span> ({b.year})</span>
          </li>
        ))}
      </ol>
    </>
  );
}
