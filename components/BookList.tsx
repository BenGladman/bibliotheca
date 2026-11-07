import { useMemo } from "react";
import { Link } from "./Link";
import { TableWithSections } from "./TableWithSections";

import type { Book } from "#util";

interface BookListProps {
  books: Book[];
  isAuthorPage?: boolean;
  isYearPage?: boolean;
  getSectionName?: (book: Book) => string;
}

export function BookList({ books, isAuthorPage, isYearPage, getSectionName }: BookListProps) {
  return (
    <TableWithSections items={books} getSectionName={getSectionName}>
      {(book) => (
        <tr key={book.title}>
          <td>
            <Link href={book.titleUrl}>{book.title}</Link>
          </td>

          {isAuthorPage ? null : (
            <td>
              <Link href={book.authorUrl}>{book.authorFullname}</Link>
            </td>
          )}

          {isYearPage ? null : (
            <td className="tabular-nums">
              <Link href={book.decadeUrl}>{book.published}</Link>
            </td>
          )}
        </tr>
      )}
    </TableWithSections>
  );
}
