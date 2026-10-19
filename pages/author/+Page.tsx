import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";

export default function Page() {
  const { authors } = useData<Data>();

  return (
    <>
      <ul>
        {authors.map((a) => (
          <li key={a.url}>
            <Link href={a.url}>{a.fullname}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
