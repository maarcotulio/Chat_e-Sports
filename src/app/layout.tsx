import type { Metadata } from "next";

import "./globals.css";
import ToastProvider from "./components/toastProvider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
export const metadata: Metadata = {
  title: "Chat",
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
          <ToastProvider>{children}</ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
