import type { Metadata } from "next";
import "./globals.css";
import "react-phone-number-input/style.css";

export const metadata: Metadata = {
  title: "RKT - Rental Karting Trophy 2026",
  description: "Hero oficial de RKT – Rental Karting Trophy 2026"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}