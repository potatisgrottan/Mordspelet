import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mysteriet på Gräddnos gods | Privata rollkort",
  description: "Ett vintrigt herrgårdsmysterium. Välj din karaktär och håll dina hemligheter för dig själv.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#171014" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="sv"><body><div className="site-shell">{children}</div></body></html>;
}
