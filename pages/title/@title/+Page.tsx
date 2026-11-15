import { useData } from "vike-react/useData";
import { Header, Link, Quote } from "#components";
import { urlCase } from "#util";
import styles from "./Page.module.css";

import type { Data } from "./+data.js";

export default function Page() {
  const { book, googleBooksReference, wikipediaReference } = useData<Data>();

  return (
    <>
      <Header>
        <h1>{book.title}</h1>
        {book.subTitle && <h2>{book.subTitle}</h2>}

        <h3>
          <Link href={book.authorUrl}>{book.authorFullname}</Link>
          <span> (</span>
          <Link href={book.decadeUrl} hash={book.published}>
            {book.published}
          </Link>
          <span>)</span>
        </h3>

        <dl className={styles.dl}>
          {book.seriesUrl && (
            <div>
              <dt>Series</dt>
              <dd>
                <Link href={book.seriesUrl}>{book.series}</Link>
              </dd>
            </div>
          )}

          {book.tags.length > 0 && (
            <div>
              <dt>Tags</dt>
              {book.tags.map((tag) => (
                <dd key={tag.tag}>
                  <Link href={tag.url} hash={urlCase(book.authorFullname)}>
                    {tag.tag}
                  </Link>
                </dd>
              ))}
            </div>
          )}

          {book.locations.length > 0 && (
            <div>
              <dt>Location</dt>
              {book.locations.map((location) => (
                <dd key={location.location}>
                  <Link href={location.url} hash={urlCase(book.authorFullname)}>
                    {location.location}
                  </Link>
                </dd>
              ))}
            </div>
          )}

          {book.read.length > 0 && (
            <div>
              <dt>Read</dt>
              {book.read.map((read) => (
                <dd key={read.year}>
                  <Link href={read.url}>{read.year}</Link>
                </dd>
              ))}
            </div>
          )}
        </dl>
      </Header>

      <div dangerouslySetInnerHTML={{ __html: book.html }} />

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
