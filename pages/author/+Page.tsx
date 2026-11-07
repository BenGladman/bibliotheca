import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";
import { useMemo } from "react";

export default function Page() {
  const { authors } = useData<Data>();

  const sections = useMemo(() => {
    return Map.groupBy(authors, (author) => author.firstLetter);
  }, [authors]);

  return (
    <>
      <h1>Authors</h1>
      <div className="flex flex-col gap-6 mt-10">
        {sections.entries().map(([sectionName, sectionAuthors]) => (
          <div key={sectionName} id={sectionName}>
            <a className="sticky-head ml-2 mb-2" href={`#${sectionName}`}>
              {sectionName}
            </a>
            <ul>
              {sectionAuthors.map((a) => (
                <li key={a.url}>
                  <Link href={a.url}>{a.fullname}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
