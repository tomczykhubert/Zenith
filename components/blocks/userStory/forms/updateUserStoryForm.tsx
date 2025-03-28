"use client";

import { z } from "zod";
import { formSchema, UserStoryForm } from "./userStoryForm";
import { useUserStoriesStore } from "@/providers/userStoriesProvider";
import UserStory from "@/types/userStory";

interface UpdateUserStoryFormProps {
  onClose: () => void;
  userStory: UserStory;
}

export default function UpdateUserStoryForm({
  onClose,
  userStory,
}: UpdateUserStoryFormProps) {
  const updateUserStory = useUserStoriesStore((state) => state.updateUserStory);

  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    updateUserStory({
      ...userStory,
      name: values.name,
      description: values.description,
      priority: values.priority,
      status: values.status,
    });
    onClose();
  };

  return (
    <>
      <UserStoryForm initialValues={userStory} onSubmit={handleUpdate} />
    </>
  );
}
