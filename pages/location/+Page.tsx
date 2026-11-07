import { useData } from "vike-react/useData";
import { Link, TableWithSections } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { locations } = useData<Data>();

  return (
    <TableWithSections items={locations}>
      {(item) => (
        <tr key={item.location}>
          <td>
            <Link href={item.url}>{item.location}</Link>
          </td>
          <td className="text-right tabular-nums">{item.count}</td>
        </tr>
      )}
    </TableWithSections>
  );
}
