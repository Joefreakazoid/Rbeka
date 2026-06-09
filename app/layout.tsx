import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import LinkedInBanner from "@/components/LinkedInBanner";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rbeka — Your MBA Study Companion",
  description:
    "Ask questions about MBA coursework and get instant, well-sourced answers from class notes.",
  openGraph: {
    title: "Rbeka — Your MBA Study Companion",
    description:
      "Ask questions about MBA coursework and get instant, well-sourced answers from class notes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col pb-14">
        {children}
        <LinkedInBanner />
      </body>
    </html>
  );
}
