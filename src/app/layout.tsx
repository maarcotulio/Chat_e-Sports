import type { Metadata } from "next";

import "./globals.css";

import { Providers } from "./providers";
export const metadata: Metadata = {
  title: "Chat e-Sports",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
