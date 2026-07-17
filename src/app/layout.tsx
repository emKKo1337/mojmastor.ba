import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mojmajstor.ba"),
  title: {
    default: "MojMajstor.ba | Pronađite provjerenog majstora",
    template: "%s | MojMajstor.ba",
  },
  description:
    "MojMajstor.ba povezuje korisnike sa provjerenim majstorima i servisnim profesionalcima širom Bosne i Hercegovine. Sigurno, brzo i pouzdano.",
  keywords: [
    "majstori",
    "vodoinstalater",
    "električar",
    "moler",
    "keramičar",
    "Bosna i Hercegovina",
    "kućne usluge",
  ],
  openGraph: {
    type: "website",
    locale: "bs_BA",
    siteName: "MojMajstor.ba",
    title: "MojMajstor.ba | Pronađite provjerenog majstora",
    description:
      "Hiljade provjerenih majstora spremno je pomoći oko renoviranja, popravki i svih kućnih usluga.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MojMajstor.ba | Pronađite provjerenog majstora",
    description:
      "Hiljade provjerenih majstora spremno je pomoći oko renoviranja, popravki i svih kućnih usluga.",
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = window.localStorage.getItem('mm-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bs" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/*
          Material Symbols ships variable icon axes (FILL/wght/GRAD/opsz) that
          next/font/google doesn't expose, so it's loaded via a direct stylesheet
          link here in the root layout — the App Router's documented pattern for
          external fonts. eslint-plugin-next's no-page-custom-font rule targets
          the Pages Router's pages/_document.js convention and doesn't recognize
          this file as exempt, so it misfires here; safe to disable.
        */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-text-main">
        <Script id="mm-theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
