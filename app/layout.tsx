import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";


const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "700", "800"]
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Ali Tumer | Museum Portfolio",
  description: "Minimal portfolio with premium glass UI, multilingual content, and subtle gradient-flow motion."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${heading.variable} ${body.variable} ${GeistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
