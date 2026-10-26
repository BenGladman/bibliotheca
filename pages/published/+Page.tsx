import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";

export default function Page() {
  const { decades } = useData<Data>();

  return (
    <>
      <ul className="tabular-nums">
        {decades.map((decade) => (
          <li key={decade.description}>
            <Link href={decade.url}>{decade.description}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
