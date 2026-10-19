import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";

export default function Page() {
  const { books } = useData<Data>();

  return (
    <>
      <ul>
        {books.map((b) => (
          <li key={b.url}>
            <Link href={b.url}>
              {b.title} – {b.authorFullname} ({b.year})
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
