import { useData } from "vike-react/useData";
import { Header, Link, TableWithSections } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { title, series } = useData<Data>();

  return (
    <>
      <Header>
        <h1>{title}</h1>
      </Header>

      <TableWithSections items={series}>
        {(item) => (
          <tr key={item.series}>
            <td>
              <Link href={item.seriesUrl}>{item.series}</Link>
            </td>
            <td>
              <Link href={item.authorUrl}>{item.authorFullname}</Link>
            </td>
            <td className="text-right tabular-nums">{item.count}</td>
          </tr>
        )}
      </TableWithSections>
    </>
  );
}
