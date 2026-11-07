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
  const sections = Map.groupBy(items, (item) => getSectionName?.(item));

  return (
    <table>
      {sections.entries().map(([sectionName, sectionItems]) => (
        <tbody key={sectionName} className="relative">
          {sectionName && (
            <tr key={sectionName}>
              <th colSpan={3} aria-label={sectionName} id={sectionName}>
                <div className="min-h-10" />
                <div className="pointer-events-none absolute inset-0">
                  <a
                    className="pointer-events-auto sticky top-5 mt-5 mb-4 ml-2 inline-flex min-w-8 justify-center rounded-full border-2 border-gray-20 bg-amber-20 px-1 text-lg font-bold text-gray-20 no-underline"
                    href={`#${sectionName}`}
                  >
                    {sectionName}
                  </a>
                </div>
              </th>
            </tr>
          )}

          {sectionItems.map((item) => children(item))}
        </tbody>
      ))}
    </table>
  );
}
