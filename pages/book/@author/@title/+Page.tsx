import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export default function Page() {
  const { attributes, html } = useData<Data>();

  return (
    <>
      <h1>{attributes.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
