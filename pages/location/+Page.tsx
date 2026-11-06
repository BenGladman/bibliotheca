import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";

export default function Page() {
  const { locations } = useData<Data>();

  return (
    <>
      <ul>
        {locations.map((location) => (
          <li key={location.location}>
            <Link href={location.url}>{location.location}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
