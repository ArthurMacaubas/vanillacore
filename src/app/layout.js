import React from "react";

import "./globals.css";

export const metadata = {
  title: "VanillaCore | GellatoItali",
  description: "Painel e vitrine da sorveteria GellatoItali.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
