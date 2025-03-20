"use client";

import { ProjectsStoreProvider } from "@/providers/projectsProvider";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProjectsStoreProvider>
      <div className="mx-5 mt-5 mb-5">{children}</div>
    </ProjectsStoreProvider>
  );
}
