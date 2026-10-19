import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";

export default function Page() {
  const { books } = useData<Data>();

  return (
    <>
      <h1>{books[0].authorFullname}</h1>

      <ol>
        {books.map((b) => (
          <li key={b.title}>
            <Link href={b.titleUrl}>
              {b.title} ({b.year})
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
