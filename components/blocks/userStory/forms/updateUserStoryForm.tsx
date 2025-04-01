"use client";

import { z } from "zod";
import { formSchema, UserStoryForm } from "./userStoryForm";
import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
import UserStory from "@/types/userStory";
import { toast } from "react-toastify";
import { useDictionary } from "@/providers/dictionaryProvider";
import UpdateFormProps from "@/types/forms/updateFormProps";

type UpdateUserStoryFormProps = UpdateFormProps<UserStory>;

export default function UpdateUserStoryForm({
  onSubmit,
  item: userStory,
}: UpdateUserStoryFormProps) {
  const updateUserStory = useUsersStoretoriesStore(
    (state) => state.updateUserStory
  );
  const { t } = useDictionary();

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateUserStory({
        ...userStory,
        name: values.name,
        description: values.description,
        priority: values.priority,
        status: values.status,
      });
      toast.success(t("userStory.toast.update.success"));
    } catch {
      toast.error(t("userStory.toast.update.success"));
    }
    onSubmit();
  };

  return (
    <>
      <UserStoryForm initialValues={userStory} onSubmit={handleUpdate} />
    </>
  );
}
