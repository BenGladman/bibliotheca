import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export default function Page() {
  const { tag, books } = useData<Data>();

  return (
    <>
      <h1>{tag}</h1>

      <ol>
        {books.map((b) => (
          <li key={b.title}>
            <a href={b.titleUrl}>
              {b.title} – {b.authorFullname} ({b.year})
            </a>
          </li>
        ))}
      </ol>
    </>
  );
}
