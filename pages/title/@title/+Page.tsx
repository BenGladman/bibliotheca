import { useData } from "vike-react/useData";
import { Link, Quote } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { book, googleBooksReference, wikipediaReference } = useData<Data>();

  return (
    <>
      <h1>{book.title}</h1>
      {book.subTitle && <h2>{book.subTitle}</h2>}

      <h3>
        <Link href={book.authorUrl}>{book.authorFullname}</Link>
        <span> (</span>
        <Link href={book.decadeUrl}>{book.published}</Link>
        <span>)</span>
      </h3>

      <div dangerouslySetInnerHTML={{ __html: book.html }} />

      {book.seriesUrl && (
        <p className="flex gap-2">
          <span>Series:</span>
          <Link href={book.seriesUrl}>{book.series}</Link>
        </p>
      )}

      {book.tags.length > 0 && (
        <p className="flex flex-wrap gap-2">
          <span>Tags:</span>
          {book.tags.map((tag) => (
            <Link key={tag.tag} href={tag.url}>
              {tag.tag}
            </Link>
          ))}
        </p>
      )}

      {book.locations.length > 0 && (
        <p className="flex flex-wrap gap-2">
          <span>Location:</span>
          {book.locations.map((location) => (
            <Link key={location.location} href={location.url}>
              {location.location}
            </Link>
          ))}
        </p>
      )}

      {book.read.length > 0 && (
        <p className="flex flex-wrap gap-2">
          <span>Read:</span>
          {book.read.map((read) => (
            <Link key={read.year} href={read.url}>
              {read.year}
            </Link>
          ))}
        </p>
      )}

      {wikipediaReference && (
        <Quote
          html={wikipediaReference.extract.join("\n")}
          cite={wikipediaReference.cite}
          citeTitle="Wikipedia"
        />
      )}

      {googleBooksReference && (
        <Quote
          html={googleBooksReference.description.join("\n")}
          cite={googleBooksReference.cite}
          citeTitle="Google Books"
        />
      )}
    </>
  );
}
