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
  title: "FounderIQ -- AI Co-Founder Platform",
  description:
    "Validate startup ideas, generate business models, craft investor pitches, and analyze markets with AI-powered tools.",
  openGraph: {
    title: "FounderIQ -- AI Co-Founder Platform",
    description:
      "Validate startup ideas, generate business models, craft investor pitches, and analyze markets.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
      <body className="min-h-dvh bg-background text-foreground font-sans">{children}</body>
    </html>
  );
}
