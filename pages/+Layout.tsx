import { Link } from "#components";
import "./tailwind.css";
import logoUrl from "../assets/logo.svg";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-auto flex max-w-5xl">
      <Sidebar>
        <Logo />
        <Link href="/author">Authors</Link>
        <Link href="/title">Books</Link>
        <Link href="/series">Series</Link>
        <Link href="/published">Published</Link>
        <Link href="/tag">Tags</Link>
        <Link href="/location">Locations</Link>
        <Link href="/read">Read</Link>
      </Sidebar>
      <Content>{children}</Content>
    </div>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="shrink-0">
      <div className="sticky top-0 flex flex-col p-6">{children}</div>
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Logo() {
  return (
    <div className="mb-10">
      <Link href="/">
        <img src={logoUrl} height={64} width={64} alt="logo" />
      </Link>
    </div>
  );
}
