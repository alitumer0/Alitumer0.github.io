import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const heading = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400"
});

const body = VT323({
  subsets: ["latin"],
  variable: "--font-body",
  weight: "400"
});

export const metadata: Metadata = {
  title: "RPG Character Sheet Portfolio",
  description: "Retro RPG styled, responsive character sheet portfolio page built with Next.js and Tailwind CSS."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${heading.variable} ${body.variable} ${GeistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
