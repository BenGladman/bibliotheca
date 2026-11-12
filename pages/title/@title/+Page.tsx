import { useData } from "vike-react/useData";
import { Link } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { book, googleBooksReference, wikipediaReference } = useData<Data>();

  return (
    <>
      <h1>{book.title}</h1>

      <h2>
        <Link href={book.authorUrl}>{book.authorFullname}</Link>
        <span> (</span>
        <Link href={book.decadeUrl}>{book.published}</Link>
        <span>)</span>
      </h2>

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

      {googleBooksReference && (
        <>
          <blockquote
            className="mt-6 border-l-2 border-gray-90/50 pl-2"
            dangerouslySetInnerHTML={{ __html: googleBooksReference.description }}
            cite={googleBooksReference.cite}
          />
          <cite className="block text-right">
            <a href={googleBooksReference.cite}>Google Books</a>
          </cite>
        </>
      )}

      {wikipediaReference && (
        <>
          <blockquote
            className="mt-6 border-l-2 border-gray-90/50 pl-2"
            dangerouslySetInnerHTML={{ __html: wikipediaReference.extract }}
            cite={wikipediaReference.cite}
          />
          <cite className="block text-right">
            <a href={wikipediaReference.cite}>Wikipedia</a>
          </cite>
        </>
      )}
    </>
  );
}
