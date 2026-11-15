import { Link } from "./Link";
import styles from "./Navigation.module.css";

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <Link href="/author">Authors</Link>
      <Link href="/title">Books</Link>
      <Link href="/series">Series</Link>
      <Link href="/published">Published</Link>
      <Link href="/tag">Tags</Link>
      <Link href="/location">Locations</Link>
      <Link href="/read">Read</Link>
    </nav>
  );
}
