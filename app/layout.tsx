import type { Metadata } from "next";
import { Inter, VT323, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const vt323 = VT323({subsets: ["latin"], weight: ["400"]})
const pressStart2p = Press_Start_2P({subsets: ["latin"], weight: ["400"]})
export const metadata: Metadata = {
  title: "URL shortener",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={vt323.className}>
      <head>
        <link rel="icon" href="/cut.svg" sizes=""/>
      </head>
      <body className={vt323.className}>{children}</body>
    </html>
  );
}
