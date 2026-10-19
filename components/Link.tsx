import { usePageContext } from "vike-react/usePageContext";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children }: LinkProps) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;

  const resolvedHref = href.startsWith("/") ? `${import.meta.env.BASE_URL}${href.slice(1)}` : href;

  const isActive = urlPathname.startsWith(href);

  return (
    <a href={resolvedHref} className={isActive ? "font-bold" : undefined}>
      {children}
    </a>
  );
}
