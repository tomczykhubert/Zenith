"use client";

import Header from "@/components/blocks/header";
import { AuthStoreProvider } from "@/providers/authProvider";
import { DictionaryProvider } from "@/providers/dictionaryProvider";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DictionaryProvider>
      <AuthStoreProvider>
        <Header />
        {children}
      </AuthStoreProvider>
    </DictionaryProvider>
  );
}
