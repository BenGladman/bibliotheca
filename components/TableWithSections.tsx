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
  const sections = getSectionName
    ? Map.groupBy(items, (item) => getSectionName(item))
        .entries()
        .toArray()
    : [["", items] as [string, T[]]];

  return (
    <table>
      {sections.map(([sectionName, sectionItems]) => (
        <tbody key={sectionName}>
          {sectionName && (
            <tr key={sectionName}>
              <th colSpan={3} aria-label={sectionName} id={sectionName} className="pt-8 pb-0">
                <a
                  className="inline-flex min-w-12 justify-center rounded-t-3xl bg-gray-90/5 px-4 pt-1 text-lg font-bold text-amber-20 no-underline"
                  href={`#${sectionName}`}
                >
                  {sectionName}
                </a>
              </th>
            </tr>
          )}

          {sectionItems.map((item) => children(item))}
        </tbody>
      ))}
    </table>
  );
}
