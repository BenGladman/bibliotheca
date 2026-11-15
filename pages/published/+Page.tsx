import { useData } from "vike-react/useData";
import { Header, Link, TableWithSections } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { title, decades } = useData<Data>();

  return (
    <>
      <Header>
        <h1>{title}</h1>
      </Header>

      <TableWithSections items={decades}>
        {(item) => (
          <tr key={item.decadeDescription}>
            <td className="tabular-nums">
              <Link href={item.decadeUrl}>{item.decadeDescription}</Link>
            </td>
            <td className="text-right tabular-nums">{item.count}</td>
          </tr>
        )}
      </TableWithSections>
    </>
  );
}
