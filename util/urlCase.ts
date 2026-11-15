import { kebabCase } from "es-toolkit/string";

export function urlCase(value: string) {
  const lcValueWithDiacriticsRemoved = value
    .normalize("NFD")
    .toLowerCase()
    .replace(/[^a-z0-9\- ]/gu, "");
  return kebabCase(lcValueWithDiacriticsRemoved);
}
