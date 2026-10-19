import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";

export default function Page() {
  const { books } = useData<Data>();

  return (
    <>
      <ul>
        {books.map((b) => (
          <li key={b.titleUrl}>
            <Link href={b.titleUrl}>{b.title}</Link>
            <span> – </span>
            <Link href={b.authorUrl}>{b.authorFullname}</Link>
            <span> ({b.year})</span>
          </li>
        ))}
      </ul>
    </>
  );
}
