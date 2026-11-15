import styles from "./Header.module.css";

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return <header className={styles.header}>{children}</header>;
}
