"use client";

import Header from "@/components/blocks/header";
import { DictionaryProvider } from "@/providers/dictionaryProvider";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DictionaryProvider>
      <Header />
      {children}
    </DictionaryProvider>
  );
}
