import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const jakartaSans = localFont({
  src: [
    {
      path: "../public/fonts/PlusJakartaSans-VariableFont_wght.ttf",
      weight: "400 700",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zenith",
  description: "Created by Hubert Tomczyk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${jakartaSans.className}`}>{children}</body>
    </html>
  );
}
