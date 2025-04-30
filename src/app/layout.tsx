import type { Metadata } from "next";

import "./globals.css";
import ToastProvider from "./components/toastProvider";

export const metadata: Metadata = {
  title: "Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`antialiased`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
