import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "./(providers)/redux";
import { ConfirmModal } from "@/components/ui/confirm";

export const metadata: Metadata = {
  title: "سیستم شهرداری",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" data-theme="light" className="w-full">
      <body className="w-full h-screen">
        <Toaster />
        <ReduxProvider>
          {children}
          <ConfirmModal />
        </ReduxProvider>
      </body>
    </html>
  );
}
