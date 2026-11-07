import { useData } from "vike-react/useData";
import { Link, TableWithSections } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { tags } = useData<Data>();

  return (
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
  );
}
