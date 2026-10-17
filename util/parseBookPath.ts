export function parseBookPath(path: string): { author: string; title: string } {
  const match = path.match(/\/(?<author>[^/]+)\/(?<title>[^/]+)\.md$/);

  if (match?.groups) {
    return {
      author: match.groups.author,
      title: match.groups.title,
    };
  }

  return {
    author: "",
    title: "",
  };
}
