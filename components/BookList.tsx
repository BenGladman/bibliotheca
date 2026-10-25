import type { Book } from "#util";
import { Link } from "./Link";

interface BookListProps {
  books: Book[];
  isAuthorPage?: boolean;
  isYearPage?: boolean;
}

export function BookList({ books, isAuthorPage, isYearPage }: BookListProps) {
  return (
    <ul>
      {books.map((b) => (
        <li key={b.title}>
          <Link href={b.titleUrl}>{b.title}</Link>

          {isAuthorPage ? null : (
            <>
              <span> – </span>
              <Link href={b.authorUrl}>{b.authorFullname}</Link>
            </>
          )}

          <span> (</span>
          {isYearPage ? b.year : <Link href={b.decadeUrl}>{b.year}</Link>}
          <span>)</span>
        </li>
      ))}
    </ul>
  );
}
