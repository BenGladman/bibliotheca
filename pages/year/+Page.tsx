import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";

export default function Page() {
  const { decades } = useData<Data>();

  return (
    <>
      <ul>
        {decades.map((decade) => (
          <li key={decade.decade}>
            <Link href={decade.url}>{decade.decade}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
