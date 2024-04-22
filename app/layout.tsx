import type { Metadata } from "next";
import { Space_Grotesk } from 'next/font/google';
import "./globals.css";

import { NavBar } from "@/components/nav";

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: "myBlog",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${space_grotesk.className} scroll-smooth`}
    >
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
