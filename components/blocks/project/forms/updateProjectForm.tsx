"use client";

import { useProjectsStore } from "@/providers/projectsProvider";
import { z } from "zod";
import { ProjectForm, formSchema } from "./projectForm";
import Project from "@/types/project";

interface UpdateProjectFormProps {
  project: Project;
  onClose: () => void;
}

export default function UpdateProjectForm({
  project,
  onClose,
}: UpdateProjectFormProps) {
  const updateProject = useProjectsStore((state) => state.updateProject);

  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    updateProject({
      ...project,
      name: values.name,
      description: values.description,
    });
    onClose();
  };

  return (
    <ProjectForm
      initialValues={{
        name: project.name,
        description: project.description,
      }}
      onSubmit={handleUpdate}
    />
  );
}
