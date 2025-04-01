"use client";

import Header from "@/components/blocks/header";
import Toast from "@/components/ui/toast";
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
        <Header />
        {children}
        <Toast />
      </AuthStoreProvider>
    </DictionaryProvider>
  );
}
