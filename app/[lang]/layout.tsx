"use client";

import { AppSidebar } from "@/components/layout/sidebar/appSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AuthStoreProvider } from "@/providers/authProvider";
import { DictionaryProvider } from "@/providers/dictionaryProvider";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DictionaryProvider>
      <AuthStoreProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="p-4 w-full">{children}</main>
        </SidebarProvider>
        <Toaster />
      </AuthStoreProvider>
    </DictionaryProvider>
  );
}
