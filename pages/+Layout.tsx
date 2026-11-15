import { Logo, Navigation } from "#components";
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
        <Logo className={styles.sidebarLogo} />
        <Navigation />
      </div>
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.content}>
      <Logo className={styles.contentLogo} />
      <article>{children}</article>
    </div>
  );
}
