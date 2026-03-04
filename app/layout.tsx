import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Era — Consultoría AI",
  description: "Consultoría de tecnología y transformación digital con AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&family=Space+Mono:wght@400;700&family=Sora:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-black/10 bg-white/80 backdrop-blur-sm dark:border-white/10 dark:bg-black/80">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
            <a href="/" className="text-lg font-semibold">
              New Era
            </a>
            <div className="flex gap-6 text-sm font-medium">
              <a href="/design-1" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                Organic Tech
              </a>
              <a href="/design-2" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                Midnight Luxe
              </a>
              <a href="/design-3" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                Brutalist Signal
              </a>
              <a href="/design-4" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                Vapor Clinic
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
