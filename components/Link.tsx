import { usePageContext } from "vike-react/usePageContext";
import styles from "./Link.module.css";

interface LinkProps {
  href: string;
  hash?: string | number;
  children: React.ReactNode;
}

export function Link({ href, hash, children }: LinkProps) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;

  const href1 = href.startsWith("/") ? import.meta.env.BASE_URL : "";
  const href2 = href.startsWith("/") ? href.slice(1) : href;
  const href3 = hash ? `#${hash}` : "";

  const resolvedHref = `${href1}${href2}${href3}`;

  const current = urlPathname.startsWith(href) ? "page" : undefined;

  return (
    <a href={resolvedHref} aria-current={current} className={styles.link}>
      {children}
    </a>
  );
}
