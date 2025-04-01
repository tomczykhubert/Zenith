"use client";

import Header from "@/components/layout/header";
import Toast from "@/components/shared/elements/toast";
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
