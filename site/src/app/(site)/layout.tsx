import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteContent } from "@/lib/cms/site-settings";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteContent();

  return (
    <>
      <Navbar registerHref={site.registerFormUrl} site={site} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer site={site} />
    </>
  );
}
