import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import FilmGrain from "@/components/FilmGrain";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "ABHILASH P | Video Editor & Motion Designer",
  description: "Turning Frames Into Emotion. Portfolio of Abhilash P, a Video Editor & Motion Designer from Kerala, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${jetbrains.variable} ${dmSans.variable} font-sans bg-deep text-primary`}>
        <FilmGrain />
        <div className="scanlines" />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
