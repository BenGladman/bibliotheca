import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export default function Page() {
  const { authors } = useData<Data>();

  return (
    <>
      <ul>
        {authors.map((a) => (
          <li key={a.url}>
            <a href={a.url}>{a.fullname}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
