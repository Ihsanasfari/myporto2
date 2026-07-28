import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import GlobalChrome from "@/components/GlobalChrome";
import { site } from "@/data/portfolio";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Front-End Developer`,
    template: `%s — ${site.name}`
  },
  description: site.positioning,
  keywords: [
    "Ihsan Asfari",
    "front-end developer",
    "AI product UI",
    "dashboard developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "SaaS"
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — Front-End Developer`,
    description: site.positioning,
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Front-End Developer`,
    description: site.positioning
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <GlobalChrome />
        {children}
      </body>
    </html>
  );
}
