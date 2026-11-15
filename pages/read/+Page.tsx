import { useData } from "vike-react/useData";
import { Header, Link, TableWithSections } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { title, reads } = useData<Data>();

  return (
    <>
      <Header>
        <h1>{title}</h1>
      </Header>

      <TableWithSections items={reads}>
        {(item) => (
          <tr key={item.year}>
            <td className="tabular-nums">
              <Link href={item.url}>{item.description}</Link>
            </td>
            <td className="text-right tabular-nums">{item.count}</td>
          </tr>
        )}
      </TableWithSections>
    </>
  );
}
