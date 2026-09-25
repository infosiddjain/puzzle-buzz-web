import Image from "next/image";
import Link from "next/link";

export const SITE = {
  supportEmail: "infosiddjain@gmail.com",
  policyUpdated: "September 25, 2026",
  developer: "Siddharth Jain",
  developerUrl: "https://portfolio-five-brown-mafnjkhjpf.vercel.app/",
  developerGithub: "https://github.com/infosiddjain",
  developerLinkedin: "https://www.linkedin.com/in/infosiddjain/",
};

const NAV = [
  { href: "/#games", label: "Games" },
  { href: "/#how", label: "How to play" },
  { href: "/#about", label: "About" },
  { href: "/#developer", label: "Developer" },
  { href: "/privacy", label: "Privacy" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={36} height={36} className="rounded-xl" />
          <span className="text-xl font-black">
            Puzzle<span className="text-gold">Buzz</span>
          </span>
        </Link>
        <ul className="hidden items-center gap-6 text-sm font-bold text-dim md:flex">
          {NAV.map(n => (
            <li key={n.href}>
              <Link href={n.href} className="transition hover:text-white">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#C026D3] px-4 py-2 text-sm font-extrabold md:hidden"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted sm:flex-row sm:px-6">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={24} height={24} className="rounded-lg" />
            <span className="font-bold">
              Puzzle<span className="text-gold">Buzz</span> © {new Date().getFullYear()}
            </span>
          </div>
          <span>
            Developed by{" "}
            <a href={SITE.developerUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-dim hover:text-white">
              {SITE.developer}
            </a>
          </span>
        </div>
        <ul className="flex flex-wrap justify-center gap-5 font-bold">
          {NAV.map(n => (
            <li key={n.href}>
              <Link href={n.href} className="hover:text-white">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
