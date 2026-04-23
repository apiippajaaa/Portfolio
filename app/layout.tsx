import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Background from "../components/layouts/Background";
import HamburgerMenu from "@/components/layouts/HamburgerMenu";
import SectionIndicator from "@/components/layouts/SectionIndicator";
import BubbleChat from "@/components/ai/BubbleChat";

/* ================= FONTS ================= */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ================= METADATA ================= */
export const metadata: Metadata = {
  title: "Afif Misbahuddin",
  description: "Portfolio",
};

/* ================= ROOT LAYOUT ================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-black text-white antialiased overflow-x-hidden">
        <Background />

        {/* GLOBAL UI */}
        <div className="fixed top-6 right-6 z-50">
          <SectionIndicator />
          <HamburgerMenu />
        </div>

        {/* CONTENT */}
        <main>{children}</main>

        <BubbleChat />
      </body>
    </html>
  );
}
