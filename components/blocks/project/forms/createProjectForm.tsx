"use client";

import { useProjectsStore } from "@/providers/projectsProvider";
import { z } from "zod";
import { formSchema, ProjectForm } from "./projectForm";

interface CreateProjectFormProps {
  onClose: () => void;
}

export default function CreateProjectForm({ onClose }: CreateProjectFormProps) {
  const addProject = useProjectsStore((state) => state.addProject);
  const handleCreate = (values: z.infer<typeof formSchema>) => {
    addProject({
      name: values.name,
      description: values.description,
    });

    onClose();
  };

  return (
    <>
      <ProjectForm onSubmit={handleCreate} />
    </>
  );
}
