"use client";

import { AppSidebar } from "@/components/layout/sidebar/appSidebar";
import { Toaster } from "@/components/ui/sonner";

import { DictionaryProvider } from "@/providers/dictionaryProvider";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DictionaryProvider>
      <AppSidebar />
      <main className="p-4 w-full">{children}</main>
      <Toaster />
    </DictionaryProvider>
  );
}
