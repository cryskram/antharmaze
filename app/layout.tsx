import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anthar Maze",
  description: "Thrilling Chase Around The Campus For Utsav",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
