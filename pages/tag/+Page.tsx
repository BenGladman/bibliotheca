import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export default function Page() {
  const { tags } = useData<Data>();

  return (
    <>
      <ul>
        {tags.map((tag) => (
          <li key={tag.tag}>
            <a href={tag.url}>{tag.tag}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
