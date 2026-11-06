import type { Book } from "#util";
import { useMemo } from "react";
import { Link } from "./Link";

interface BookListProps {
  books: Book[];
  isAuthorPage?: boolean;
  isYearPage?: boolean;
  getSectionName?: (book: Book) => string;
}

export function BookList({ books, isAuthorPage, isYearPage, getSectionName }: BookListProps) {
  const sections = useMemo(() => {
    return Map.groupBy(books, (book) => getSectionName?.(book));
  }, [books, getSectionName]);

  return (
    <table>
      {sections.entries().map(([sectionName, sectionBooks]) => (
        <tbody key={sectionName} className="relative">
          {sectionName && (
            <tr key={sectionName} className="sticky top-0">
              <th colSpan={3}>{sectionName}</th>
            </tr>
          )}

          {sectionBooks.map((b) => (
            <tr key={b.title}>
              <td>
                <Link href={b.titleUrl}>{b.title}</Link>
              </td>

              {isAuthorPage ? null : (
                <td>
                  <Link href={b.authorUrl}>{b.authorFullname}</Link>
                </td>
              )}

              {isYearPage ? null : (
                <td>
                  <Link href={b.decadeUrl}>{b.published}</Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  );
}
