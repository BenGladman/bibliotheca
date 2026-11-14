import { Link } from "#components";
import logoUrl from "../assets/logo.svg";
import styles from "./Layout.module.css";
import "./main.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
}

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div>
        <Logo />
        <Link href="/author">Authors</Link>
        <Link href="/title">Books</Link>
        <Link href="/series">Series</Link>
        <Link href="/published">Published</Link>
        <Link href="/tag">Tags</Link>
        <Link href="/location">Locations</Link>
        <Link href="/read">Read</Link>
      </div>
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.content}>
      <div>{children}</div>
    </div>
  );
}

function Logo() {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <img src={logoUrl} height={64} width={64} alt="logo" />
      </Link>
    </div>
  );
}
