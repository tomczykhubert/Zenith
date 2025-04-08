"use client";

import { useProjectsStore } from "@/providers/projectsProvider";
import { z } from "zod";
import { formSchema, ProjectForm } from "./projectForm";
import { toast } from "sonner";
import { useDictionary } from "@/providers/dictionaryProvider";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import ActionButton from "@/components/shared/elements/actionButton";

export default function CreateProjectForm() {
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
  };

  return (
    <ProjectForm
      onSubmit={handleCreate}
      trigger={
        <ActionButton tooltip={t("project.actions.create")} size="icon">
          <MdOutlineDashboardCustomize />
        </ActionButton>
      }
      title={t("project.actions.create")}
    />
  );
}
