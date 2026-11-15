import { Header, Navigation } from "#components";
import styles from "./Page.module.css";

export default function Page() {
  return (
    <>
      <Header>
        <h1>Bibliotheca</h1>
      </Header>

      <div className={styles.nav}>
        <Navigation />
      </div>
    </>
  );
}
