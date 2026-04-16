import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "../components/layouts/Background";
import HamburgerMenu from "@/components/layouts/HamburgerMenu";
import ScrollWrapper from "@/components/layouts/ScrollWrapper";
import SectionIndicator from "@/components/layouts/SectionIndicator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Afif Misbahuddin",
  description: "Portfolio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-svh relative">
        <Background />

        {/* ✅ HAMBURGER (FIXED DI ATAS) */}
        <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[999]">
          <SectionIndicator />
          <HamburgerMenu />
        </div>

        {/* ✅ SCROLL CONTENT */}
        {/* <main className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
          {children}
        </main> */}

        <ScrollWrapper>{children}</ScrollWrapper>
      </body>
    </html>
  );
}
