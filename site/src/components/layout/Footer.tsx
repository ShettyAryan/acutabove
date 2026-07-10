import Image from "next/image";
import Link from "next/link";
import { Mail, Users, Rss } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { fadeIn } from "@/lib/motion";

const SOCIETY_LINKS = [
  { label: "About the Club", href: "/about" },
  { label: "Academic Board", href: "/team" },
  { label: "Society Journals", href: "/gallery" },
  { label: "Member Login", href: "/contact" },
];

const RESOURCE_LINKS = [
  { label: "Case Studies", href: "/gallery" },
  { label: "Surgical Atlas", href: "/gallery" },
  { label: "Research Portal", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const SOCIALS = [
  { label: "Email the society", icon: Mail, href: "mailto:hello@acutabove.org" },
  { label: "Join our community", icon: Users, href: "/contact" },
  { label: "Listen to our sessions", icon: Rss, href: "/gallery" },
];

const LOGO_SRC = "/android-chrome-192x192.png";

export function Footer() {
  return (
    <footer className="bg-primary pb-10 pt-20 text-white">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <Reveal
          variants={fadeIn}
          amount={0.15}
          className="mb-16 grid grid-cols-1 gap-12 sm:gap-14 md:grid-cols-2 lg:grid-cols-4"
        >
          <div>
            <Link href="/" className="mb-6 flex items-center gap-3">
              <Image
                src={LOGO_SRC}
                alt="A Cut Above emblem"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border border-white/20 object-cover"
              />
              <span className="font-display text-xl tracking-tight">
                A Cut Above
              </span>
            </Link>
            <p className="mb-8 max-w-xs text-sm leading-relaxed text-white/75">
              The surgical society of Kasturba Medical College, Mangalore —
              dedicated to clinical excellence and academic mentorship.
            </p>
            <div className="flex gap-4">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-primary"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Society" links={SOCIETY_LINKS} />
          <FooterColumn title="Resources" links={RESOURCE_LINKS} />

          <div>
            <h4 className="mb-6 font-body text-label uppercase text-white/60">
              Affiliation
            </h4>
            <p className="text-sm leading-relaxed text-white/75">
              Part of the Manipal Academy of Higher Education (MAHE) network.
            </p>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-[10px] uppercase tracking-widest text-white/45">
                MAHE Research Ethics Board Compliant
              </p>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-[11px] uppercase tracking-widest text-white/45 md:flex-row">
          <p className="text-center">© {new Date().getFullYear()} KMC Mangalore Surgical Society.</p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <Link href="/contact" className="py-1 transition-opacity hover:opacity-100 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/contact" className="py-1 transition-opacity hover:opacity-100 hover:text-white">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-6 font-body text-label uppercase text-white/60">
        {title}
      </h4>
      <ul className="space-y-4 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="inline-flex min-h-10 items-center text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
