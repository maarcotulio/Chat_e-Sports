import type { Metadata } from "next";

import "./globals.css";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./providers";
export const metadata: Metadata = {
  title: "Chat e-Sports",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="pt-br">
      <body className={`antialiased`}>
        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
