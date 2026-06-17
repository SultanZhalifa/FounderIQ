import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://founderiq.vercel.app"),
  title: {
    default: "FounderIQ -- AI Co-Founder Platform",
    template: "%s · FounderIQ",
  },
  applicationName: "FounderIQ",
  description:
    "Validate startup ideas, generate business models, craft investor pitches, and analyze markets with AI-powered tools.",
  keywords: [
    "startup idea validator",
    "business model canvas generator",
    "investor pitch generator",
    "market analysis",
    "TAM SAM SOM",
    "AI co-founder",
    "startup tools",
  ],
  openGraph: {
    title: "FounderIQ -- AI Co-Founder Platform",
    description:
      "Validate startup ideas, generate business models, craft investor pitches, and analyze markets.",
    type: "website",
    siteName: "FounderIQ",
  },
  twitter: {
    card: "summary_large_image",
    title: "FounderIQ -- AI Co-Founder Platform",
    description:
      "Validate startup ideas, generate business models, craft investor pitches, and analyze markets.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable} dark antialiased`}>
      <body className="min-h-dvh bg-background text-foreground font-sans">{children}</body>
    </html>
  );
}
