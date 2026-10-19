import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";

export default function Page() {
  const { series } = useData<Data>();

  return (
    <>
      <ul>
        {series.map((a) => (
          <li key={a.url}>
            <Link href={a.url}>{a.series}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
