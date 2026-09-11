import type { Metadata, Viewport } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";

const font = Outfit({
  variable: "--font-taste",
  subsets: ["latin"],
});

const headingFont = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#F4F5F7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents zooming on mobile
};

export const metadata: Metadata = {
  title: "Nippon Toyota | TCO Calculator",
  description: "Calculate your 5-year cost of ownership",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${font.variable} ${headingFont.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
