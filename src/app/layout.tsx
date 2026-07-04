import type { Metadata } from "next";
import {
  Instrument_Sans,
  Playfair_Display,
  Fraunces,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kingdom Artists — The Home for Kingdom Creatives",
  description:
    "Discover and connect with Christian creatives building culture rooted in the Kingdom of Heaven. Musicians, filmmakers, designers, and visionary artists — all in one place.",
  openGraph: {
    title: "Kingdom Artists — The Home for Kingdom Creatives",
    description:
      "Discover and connect with Christian creatives building culture rooted in the Kingdom of Heaven.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${playfair.variable} ${fraunces.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
