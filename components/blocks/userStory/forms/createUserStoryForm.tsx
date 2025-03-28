"use client";

import { useUserStoriesStore } from "@/providers/userStoriesProvider";
import { z } from "zod";
import { formSchema, UserStoryForm } from "./userStoryForm";
import { UserStoryPriority, UserStoryStatus } from "@prisma/client";

interface CreateUserStoryFormProps {
  onClose: () => void;
  projectId: string;
  userId: string;
}

export default function CreateUserStoryForm({
  onClose,
  projectId,
  userId,
}: CreateUserStoryFormProps) {
  const addUserStory = useUserStoriesStore((state) => state.addUserStory);

  const handleCreate = (values: z.infer<typeof formSchema>) => {
    const name = values.name;
    const description = values.description;
    const priority = values.priority;
    const status = values.status;

    addUserStory({
      name,
      description,
      priority,
      status,
      projectId,
      userId,
    });

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
          projectId,
        }}
        onSubmit={handleCreate}
      />
    </>
  );
}
