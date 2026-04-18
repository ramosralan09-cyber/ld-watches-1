import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif-var",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LD Watches — Donde el tiempo, se vuelve estilo",
  description:
    "Relojes, carteras y cadenas premium en Mayaguez, Puerto Rico. Cambio de batería, ajuste de medidas y pedidos especiales. Entregas en la zona oeste.",
  keywords: [
    "relojes",
    "Puerto Rico",
    "Mayaguez",
    "watches",
    "carteras",
    "cadenas",
    "LD Watches",
    "zona oeste PR",
  ],
  openGraph: {
    title: "LD Watches",
    description: "Donde el tiempo, se vuelve estilo",
    siteName: "LD Watches",
    locale: "es_PR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LD Watches",
    description: "Donde el tiempo, se vuelve estilo",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased grain-overlay">{children}</body>
    </html>
  );
}
