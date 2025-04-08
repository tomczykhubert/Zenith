"use client";

import { z } from "zod";
import { formSchema, UserStoryForm } from "./userStoryForm";
import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
import UserStory from "@/types/userStory";
import { toast } from "sonner";
import { useDictionary } from "@/providers/dictionaryProvider";
import UpdateFormProps from "@/types/props/updateFormProps";
import ActionButton from "@/components/shared/elements/actionButton";
import { LuPencil } from "react-icons/lu";

type UpdateUserStoryFormProps = UpdateFormProps<UserStory>;

export default function UpdateUserStoryForm({
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
  };

  return (
    <>
      <UserStoryForm
        initialValues={userStory}
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
        title={t("userStory.actions.edit")}
      />
    </>
  );
}
