import { useData } from "vike-react/useData";
import { Header, Link, TableWithSections } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { title, tags } = useData<Data>();

  return (
    <>
      <Header>
        <h1>{title}</h1>
      </Header>

      <TableWithSections items={tags}>
        {(item) => (
          <tr key={item.tag}>
            <td>
              <Link href={item.url}>{item.tag}</Link>
            </td>
            <td className="text-right tabular-nums">{item.count}</td>
          </tr>
        )}
      </TableWithSections>
    </>
  );
}
