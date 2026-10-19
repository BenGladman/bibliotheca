import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { Link } from "#components";

export default function Page() {
  const { title, html, authorFullname, authorUrl, year, tags } = useData<Data>();

  return (
    <>
      <h1>{title}</h1>

      <h2>
        <Link href={authorUrl}>{authorFullname}</Link> ({year})
      </h2>

      <div dangerouslySetInnerHTML={{ __html: html }} />

      <p className="flex gap-2 flex-wrap">
        <span>Tags:</span>
        {tags.map((tag) => (
          <Link key={tag.tag} href={tag.url}>
            {tag.tag}
          </Link>
        ))}
      </p>
    </>
  );
}
