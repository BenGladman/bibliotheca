import { useData } from "vike-react/useData";
import { Link, TableWithSections } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { reads } = useData<Data>();

  return (
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
  );
}
