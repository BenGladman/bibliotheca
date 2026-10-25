import { Link } from "#components";
import "./tailwind.css";
import logoUrl from "../assets/logo.svg";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-w-5xl m-auto">
      <Sidebar>
        <Logo />
        <Link href="/author">Authors</Link>
        <Link href="/title">Books</Link>
        <Link href="/series">Series</Link>
        <Link href="/year">Years</Link>
        <Link href="/tag">Tags</Link>
        <Link href="/read">Read</Link>
      </Sidebar>
      <Content>{children}</Content>
    </div>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5 shrink-0 border-r border-r-gray-30">
      <div className="sticky top-0 flex flex-col ">{children}</div>
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="p-5 pb-12 min-h-screen">{children}</div>
    </div>
  );
}

function Logo() {
  return (
    <div className={"p-5 mb-2"}>
      <Link href="/">
        <img src={logoUrl} height={64} width={64} alt="logo" />
      </Link>
    </div>
  );
}
