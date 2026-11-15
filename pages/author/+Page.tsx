import { useData } from "vike-react/useData";
import { Header, Link, TableWithSections } from "#components";

import type { Data } from "./+data.js";

export default function Page() {
  const { title, authors } = useData<Data>();

  return (
    <>
      <Header>
        <h1>{title}</h1>
      </Header>

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
    </>
  );
}
