import type { Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// Import Roboto and assign it to a CSS variable
const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: 'swap',
});

/**
 * Deliberately minimal. This wraps EVERY route, including /studio, so it
 * only contains things that should apply universally (the <html>/<body>
 * shell, global CSS, base theme color). Site chrome (Header/Footer/etc.)
 * and full SEO metadata live in app/(site)/layout.tsx instead, so Studio
 * doesn't inherit them.
 */

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://masterpiecehomeservices.ca"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${roboto.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-blue-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}