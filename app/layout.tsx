import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://anamika-sarees-indore.nikhilbaraskar551.chatgpt.site"),
  title: "Anamika Sarees | Premium Sarees & Lehengas in Indore",
  description: "Discover premium bridal, wedding, festive and designer sarees and lehengas at Anamika Sarees, Sitlamata Bazar, Indore. Pan India shipping.",
  keywords: ["saree shop in Indore", "bridal sarees Indore", "lehenga shop Indore", "Sitlamata Bazar saree shop", "Anamika Sarees"],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: { title: "Anamika Sarees — Elegance Woven for Every Celebration", description: "Premium sarees and lehengas in Indore with Pan India shipping.", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Anamika Sarees — Elegance Woven for Every Celebration" }] },
  twitter: { card: "summary_large_image", title: "Anamika Sarees", description: "Elegance Woven for Every Celebration", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
