import type { Metadata } from "next";
import { Press_Start_2P, VT323, Cinzel_Decorative } from "next/font/google";
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

const ornamental = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-ornamental",
  weight: ["400", "700", "900"]
});

export const metadata: Metadata = {
  title: "Ali Eren Tümer — RPG Portfolio",
  description: "Premium RPG-themed character sheet portfolio. Full-Stack Developer showcasing skills, quests, achievements and inventory."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${heading.variable} ${body.variable} ${ornamental.variable} ${GeistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
