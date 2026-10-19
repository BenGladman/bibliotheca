import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";

export default function Page() {
  const { tags } = useData<Data>();

  return (
    <>
      <ul>
        {tags.map((tag) => (
          <li key={tag.tag}>
            <Link href={tag.url}>{tag.tag}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
