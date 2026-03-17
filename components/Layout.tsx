import { Geist, Geist_Mono } from "next/font/google";

import type { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to main content
      </a>
      {children}
    </div>
  );
}
