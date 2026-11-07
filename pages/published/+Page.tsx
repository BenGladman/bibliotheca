import { useData } from "vike-react/useData";
import { Link, TableWithSections } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { decades } = useData<Data>();

  return (
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
  );
}
