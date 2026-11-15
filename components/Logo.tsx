import logoUrl from "../assets/logo.svg";
import { Link } from "./Link";

interface LogoProps {
  className?: string;
}
export function Logo({ className }: LogoProps) {
  return (
    <div className={className}>
      <Link href="/">
        <img src={logoUrl} height={64} width={64} alt="logo" />
      </Link>
    </div>
  );
}
