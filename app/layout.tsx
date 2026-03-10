import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Era — Consultoría de Inteligencia Artificial para la Transformación Digital",
  description:
    "New Era transforma empresas con inteligencia artificial. Diagnóstico, implementación y optimización de soluciones IA para acelerar tu crecimiento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&family=Space+Mono:wght@400;700&family=Sora:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="https://prod.spline.design/iGPLjOiD0fjgA6nv/scene.splinecode"
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        {children}

        {/* ElevenLabs Voice Agent Widget */}
        {/* @ts-expect-error -- custom element from ElevenLabs widget embed */}
        <elevenlabs-convai agent-id="agent_6901kjw7mhbces0r3e0fg9ykvm1a"></elevenlabs-convai>
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
