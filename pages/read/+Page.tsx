import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";

export default function Page() {
  const { reads } = useData<Data>();

  return (
    <>
      <ul className="tabular-nums">
        {reads.map((read) => (
          <li key={read.description}>
            <Link href={read.url}>{read.description}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
