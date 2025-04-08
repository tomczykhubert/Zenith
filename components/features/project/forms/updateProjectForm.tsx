"use client";

import { useProjectsStore } from "@/providers/projectsProvider";
import { z } from "zod";
import { ProjectForm, formSchema } from "./projectForm";
import Project from "@/types/project";
import { toast } from "sonner";
import { useDictionary } from "@/providers/dictionaryProvider";
import UpdateFormProps from "@/types/props/updateFormProps";
import ActionButton from "@/components/shared/elements/actionButton";
import { LuPencil } from "react-icons/lu";

type UpdateProjectFormProps = UpdateFormProps<Project>;

export default function UpdateProjectForm({
  item: project,
}: UpdateProjectFormProps) {
  const { t } = useDictionary();
  const updateProject = useProjectsStore((state) => state.updateProject);

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateProject({
        ...project,
        name: values.name,
        description: values.description,
      });
      toast.success(t("project.toast.update.success"));
    } catch {
      toast.error(t("project.toast.update.failed"));
    }
  };

  return (
    <ProjectForm
      initialValues={{
        name: project.name,
        description: project.description,
      }}
      onSubmit={handleUpdate}
      trigger={
        <ActionButton
          variant="secondary"
          size="icon"
          tooltip={t("project.actions.edit")}
        >
          <LuPencil />
        </ActionButton>
      }
      title={t("project.actions.edit")}
    />
  );
}
