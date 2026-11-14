import { usePageContext } from "vike-react/usePageContext";
import styles from "./Link.module.css";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children }: LinkProps) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;

  const resolvedHref = href.startsWith("/") ? `${import.meta.env.BASE_URL}${href.slice(1)}` : href;

  const current = urlPathname.startsWith(href) ? "page" : undefined;

  return (
    <a href={resolvedHref} aria-current={current} className={styles.link}>
      {children}
    </a>
  );
}
