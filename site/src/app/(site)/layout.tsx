import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getRegisterFormUrl } from "@/lib/cms/site-settings";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const registerHref = await getRegisterFormUrl();

  return (
    <>
      <Navbar registerHref={registerHref} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
