import type { Metadata } from "next";
import { Space_Grotesk } from 'next/font/google';
import "./globals.css";

import NextTransitionBar from "next-transition-bar";

import { NavBar } from "@/components/nav";
import {Toaster} from "@/components/ui/sonner";

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
      <NextTransitionBar color="black" showSpinner={false} />
      <body>
        <NavBar />
        {children}
        <Toaster />
      </body>

    </html>
  );
}
