import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";

export default function Page() {
  const { reads } = useData<Data>();

  return (
    <>
      <ul>
        {reads.map((read) => (
          <li key={read.year}>
            <Link href={read.url}>Read in {read.year}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
