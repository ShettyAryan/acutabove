export const metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100] h-[100dvh] w-screen overflow-hidden bg-white">
      {children}
    </div>
  );
}
