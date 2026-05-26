import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Central Tricolor 🇨🇴 — Camisetas Selección Colombia $60.000",
  description: "Camisetas Premium Selección Colombia desde $60.000 COP. Envío Gratis Contra Entrega. Escudo bordado HD, Dry-Fit, costuras reforzadas. Pide por WhatsApp.",
  keywords: ["Central Tricolor", "Selección Colombia", "Camiseta Colombia", "Jersey Colombia", "Camiseta Tricolor", "Envío Gratis", "Contra Entrega"],
  authors: [{ name: "Central Tricolor" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Central Tricolor 🇨🇴 — Camisetas Selección Colombia",
    description: "Desde $60.000 · Envío Gratis Contra Entrega · Escudo bordado HD · Dry-Fit",
    type: "website",
    locale: "es_CO",
    url: "https://begoodshopcol.pages.dev",
    siteName: "Central Tricolor",
    images: [
      {
        url: "/jersey-caballero.jpg",
        width: 864,
        height: 1152,
        alt: "Camiseta Selección Colombia Central Tricolor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Central Tricolor 🇨🇴 — Camisetas Selección Colombia",
    description: "Desde $60.000 · Envío Gratis Contra Entrega",
    images: ["/jersey-caballero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '27013095951686578');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=27013095951686578&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
