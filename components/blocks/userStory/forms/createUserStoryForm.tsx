"use client";

import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
import { z } from "zod";
import { formSchema, UserStoryForm } from "./userStoryForm";
import { UserStoryPriority, UserStoryStatus } from "@prisma/client";
import ID from "@/types/id";
import { toast } from "react-toastify";
import { useDictionary } from "@/providers/dictionaryProvider";

interface CreateUserStoryFormProps {
  ownerId: ID;
  projectId: ID;
  onClose: () => void;
}

export default function CreateUserStoryForm({
  ownerId,
  projectId,
  onClose,
}: CreateUserStoryFormProps) {
  const addUserStory = useUsersStoretoriesStore((state) => state.addUserStory);
  const { t } = useDictionary();

  const handleCreate = async (values: z.infer<typeof formSchema>) => {
    const name = values.name;
    const description = values.description;
    const priority = values.priority;
    const status = values.status;

    try {
      await addUserStory({
        name,
        description,
        priority,
        status,
        projectId,
        ownerId,
      });
      toast.success(t("userStory.toast.create.success"));
    } catch {
      toast.error(t("userStory.toast.create.failed"));
    }
    onClose();
  };
  return (
    <>
      <UserStoryForm
        initialValues={{
          name: "",
          description: "",
          priority: UserStoryPriority.LOW,
          status: UserStoryStatus.PENDING,
        }}
        onSubmit={handleCreate}
      />
    </>
  );
}
