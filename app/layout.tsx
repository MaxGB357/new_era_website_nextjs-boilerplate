import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "New Era Website",
  description: "New Era Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-sm dark:border-white/10 dark:bg-black/80">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
            <a href="/" className="text-lg font-semibold">
              New Era
            </a>
            <div className="flex gap-6 text-sm font-medium">
              <a href="/design-1" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                Diseño 1
              </a>
              <a href="/design-2" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                Diseño 2
              </a>
              <a href="/design-3" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                Diseño 3
              </a>
            </div>
          </div>
        </nav>
        <div className="pt-14">
          {children}
        </div>
      </body>
    </html>
  );
}
