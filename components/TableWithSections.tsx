import { useMemo } from "react";
import { urlCase } from "#util";
import styles from "./TableWithSections.module.css";

interface TableWithSectionsProps<T> {
  items: T[];
  getSectionName?: (item: T) => string;
  children: (item: T) => React.ReactNode;
}

export function TableWithSections<T>({
  items,
  getSectionName,
  children,
}: TableWithSectionsProps<T>) {
  const sections = useMemo<Array<[string, T[]]>>(() => {
    if (!getSectionName) {
      return [["", items]];
    }

    return Map.groupBy(items, (item) => getSectionName(item))
      .entries()
      .toArray();
  }, [items, getSectionName]);

  return (
    <table className={styles.table}>
      {sections.map(([sectionName, sectionItems]) => {
        const id = urlCase(sectionName);

        return (
          <tbody key={sectionName}>
            {sectionName && (
              <tr key={sectionName}>
                <th colSpan={3} aria-label={sectionName} id={id}>
                  <a className={styles.sectionHead} href={`#${id}`}>
                    {sectionName}
                  </a>
                </th>
              </tr>
            )}

            {sectionItems.map((item) => children(item))}
          </tbody>
        );
      })}
    </table>
  );
}
