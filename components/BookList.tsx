import { FileTextIcon } from "lucide-react";
import styles from "./BookList.module.css";
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
            <Link href={book.titleUrl}>
              <span>{book.title}</span>
              {book.html && <FileTextIcon className={styles.icon} />}
            </Link>
          </td>

          {isAuthorPage ? null : (
            <td>
              <Link href={book.authorUrl}>{book.authorFullname}</Link>
            </td>
          )}

          {isYearPage ? null : (
            <td className="tabular-nums">
              <Link href={book.decadeUrl} hash={book.published}>
                {book.published}
              </Link>
            </td>
          )}
        </tr>
      )}
    </TableWithSections>
  );
}
