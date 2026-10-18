import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export default function Page() {
  const { books } = useData<Data>();

  return (
    <>
      <ul>
        {books.map((b) => (
          <li key={b.url}>
            <a href={b.url}>
              {b.title} – {b.authorFullname} ({b.year})
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
