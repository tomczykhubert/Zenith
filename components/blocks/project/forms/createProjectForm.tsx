"use client";

import { useProjectsStore } from "@/providers/projectsProvider";
import { z } from "zod";
import { formSchema, ProjectForm } from "./projectForm";
import { toast } from "react-toastify";
import { useDictionary } from "@/providers/dictionaryProvider";

interface CreateProjectFormProps {
  onClose: () => void;
}

export default function CreateProjectForm({ onClose }: CreateProjectFormProps) {
  const { t } = useDictionary();
  const addProject = useProjectsStore((state) => state.addProject);
  const handleCreate = async (values: z.infer<typeof formSchema>) => {
    try {
      await addProject({
        name: values.name,
        description: values.description,
      });
      toast.success(t("project.toast.create.success"));
    } catch {
      toast.error(t("project.toast.create.failed"));
    }

    onClose();
  };

  return (
    <>
      <ProjectForm onSubmit={handleCreate} />
    </>
  );
}
