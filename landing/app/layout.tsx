import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "./theme-script";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const pixelify = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://quanla.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Le Anh Quan",
    template: "%s — quanla.org",
  },
  description:
    "Java Developer based in Ha Noi. Building backend systems with Spring Boot, Vaadin and a stubborn love for clean code.",
  keywords: [
    "Le Anh Quan",
    "quanla",
    "Java Developer",
    "Spring Boot",
    "Vaadin",
    "Ha Noi",
    "BHSoft",
  ],
  authors: [{ name: "Le Anh Quan", url: siteUrl }],
  openGraph: {
    title: "Le Anh Quan",
    description:
      "Java Developer based in Ha Noi. Building backend systems with Spring Boot, Vaadin and a stubborn love for clean code.",
    url: siteUrl,
    siteName: "quanla.org",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Le Anh Quan",
    description: "Java Developer · Ha Noi · quanla.org",
  },
  icons: {
    icon: [
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg?v=2",
    apple: "/favicon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${pixelify.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
