import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ThemeWrapper from "@/components/wrapper/ThemeWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aprzl CMS",
  description: "Aprizal Portfolio CMS",
  icons: "logo-icon.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
