import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export default function Page() {
  const { attributes } = useData<Data>();

  return (
    <>
      <h1>{attributes.author}</h1>
    </>
  );
}
