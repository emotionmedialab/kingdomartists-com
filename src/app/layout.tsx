import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// High-contrast display serif for the wordmark, headlines, and names.
// Needs italic + a wide weight/optical range for the editorial display moments.
const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
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
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
