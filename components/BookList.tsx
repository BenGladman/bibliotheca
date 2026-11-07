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
            <tr key={sectionName}>
              <th colSpan={3} aria-label={sectionName} id={sectionName}>
                <div className="min-h-10" />
                <div className="absolute inset-0">
                  <a className="sticky-head ml-4 mt-5" href={`#${sectionName}`}>
                    {sectionName}
                  </a>
                </div>
              </th>
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
