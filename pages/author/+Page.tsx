import { useMemo } from "react";
import { useData } from "vike-react/useData";
import { Link, TableWithSections } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { authors } = useData<Data>();

  return (
    <TableWithSections items={authors} getSectionName={(item) => item.authorFirstLetter}>
      {(item) => (
        <tr key={item.authorFirstLetter}>
          <td>
            <Link href={item.authorUrl}>{item.authorFullname}</Link>
          </td>
          <td className="text-right tabular-nums">{item.count > 1 ? item.count : null}</td>
        </tr>
      )}
    </TableWithSections>
  );
}
