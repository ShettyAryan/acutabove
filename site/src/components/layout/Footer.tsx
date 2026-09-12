import Image from "next/image";
import Link from "next/link";
import { Mail, Users, Rss } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { fadeIn } from "@/lib/motion";
import { SITE_CONTENT, type SiteContent } from "@/lib/site-content";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function Footer({ site = SITE_CONTENT }: { site?: SiteContent }) {
  const socials = [
    {
      label: "Follow us on Instagram",
      icon: InstagramIcon,
      href: site.instagramUrl,
      external: true,
    },
    {
      label: "Email the society",
      icon: Mail,
      href: `mailto:${site.email}`,
    },
    { label: "Join our Event", icon: Users, href: "/events" },
    { label: "Gallery", icon: Rss, href: "/gallery" },
  ];

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
                src={site.brandLogo.src}
                alt={site.brandLogo.alt}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border border-white/20 object-cover"
              />
              <span className="font-display text-xl tracking-tight">
                {site.siteName}
              </span>
            </Link>
            <p className="mb-8 max-w-xs text-sm leading-relaxed text-white/75">
              {site.footerBlurb}
            </p>
            <div className="flex flex-wrap gap-4">
              {socials.map(({ label, icon: Icon, href, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-primary"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Society" links={site.footerSocietyLinks} />
          <FooterColumn title="Resources" links={site.footerResourceLinks} />

          <div>
            <h4 className="mb-6 font-body text-label uppercase text-white/60">
              Affiliation
            </h4>
            <p className="text-sm leading-relaxed text-white/75">
              {site.footerAffiliation}
            </p>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-[10px] uppercase tracking-widest text-white/45">
                MAHE Research Ethics Board Compliant
              </p>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-[11px] uppercase tracking-widest text-white/45 md:flex-row">
          <p className="text-center">
            © {new Date().getFullYear()} {site.copyrightName}.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <Link
              href="/contact"
              className="py-1 transition-opacity hover:opacity-100 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="py-1 transition-opacity hover:opacity-100 hover:text-white"
            >
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
