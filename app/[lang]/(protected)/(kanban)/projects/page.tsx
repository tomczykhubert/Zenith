"use client";
import CreateProjectForm from "@/components/features/project/forms/createProjectForm";
import ProjectsGrid from "@/components/features/project/projectsGrid";
import { useProjectsStore } from "@/providers/projectsProvider";
import { useDictionary } from "@/providers/dictionaryProvider";
import Project from "@/types/project";
import PageBreadcrumb from "@/components/shared/layout/pageBreadcrumb";

export default function Projects() {
  const { t } = useDictionary();
  const projects: Project[] | null = useProjectsStore(
    (state) => state.projects
  );

  const breadcrumbItems = [
    {
      label: t("project.projects"),
    },
  ];

  return (
    <>
      <PageBreadcrumb items={breadcrumbItems}>
        <CreateProjectForm />
      </PageBreadcrumb>
      <ProjectsGrid projects={projects} />
    </>
  );
}
