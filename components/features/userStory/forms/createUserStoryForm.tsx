"use client";

import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
import { z } from "zod";
import { formSchema, UserStoryForm } from "./userStoryForm";
import { UserStoryPriority, UserStoryStatus } from "@prisma/client";
import ID from "@/types/id";
import { toast } from "sonner";
import { useDictionary } from "@/providers/dictionaryProvider";
import ActionButton from "@/components/shared/elements/actionButton";
import { LuNotebookPen } from "react-icons/lu";

interface CreateUserStoryFormProps {
  ownerId: ID;
  projectId: ID;
}

export default function CreateUserStoryForm({
  ownerId,
  projectId,
}: CreateUserStoryFormProps) {
  const { t } = useDictionary();
  const addUserStory = useUsersStoretoriesStore((state) => state.addUserStory);

  const handleCreate = async (values: z.infer<typeof formSchema>) => {
    try {
      await addUserStory({
        name: values.name,
        description: values.description,
        priority: values.priority,
        status: values.status,
        projectId,
        ownerId,
      });
      toast.success(t("userStory.toast.create.success"));
    } catch {
      toast.error(t("userStory.toast.create.failed"));
    }
  };

  return (
    <UserStoryForm
      initialValues={{
        name: "",
        description: "",
        priority: UserStoryPriority.LOW,
        status: UserStoryStatus.PENDING,
      }}
      onSubmit={handleCreate}
      trigger={
        <ActionButton tooltip={t("userStory.actions.create")} size="icon">
          <LuNotebookPen />
        </ActionButton>
      }
      title={t("userStory.actions.create")}
    />
  );
}
