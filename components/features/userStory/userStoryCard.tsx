import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
import UpdateUserStoryForm from "./forms/updateUserStoryForm";
import UserStory from "@/types/userStory";
import { useDictionary } from "@/providers/dictionaryProvider";
import { getEnumTranslationKey } from "@/lib/utils/enums";
import { toast } from "sonner";
import { useUsersStore } from "@/providers/usersProvider";
import { routes } from "@/lib/routes/routes";
import BaseCard from "../../shared/base/baseCard";
import ActionButton from "@/components/shared/elements/actionButton";
import { LuClipboardList } from "react-icons/lu";

export default function UserStoryCard(userStory: UserStory) {
  const { t } = useDictionary();
  const deleteUserStory = useUsersStoretoriesStore(
    (state) => state.deleteUserStory
  );
  const owner = useUsersStore((state) => state.getUserById(userStory.ownerId));

  const handleDelete = () => {
    try {
      deleteUserStory(userStory.id);
      toast.success(t("userStory.toast.delete.success"));
    } catch {
      toast.error(t("userStory.toast.delete.failed"));
    }
  };

  const additionalActions = (
    <ActionButton
      variant="default"
      href={routes.userStories.tasks.index(userStory.id)}
      tooltip={t("task.tasks")}
    >
      <LuClipboardList />
    </ActionButton>
  );

  const additionalProperties = (
    <>
      <p>
        <strong>{t("userStory.properties.priority.priority")}:</strong>{" "}
        {t(
          getEnumTranslationKey(
            userStory.priority,
            "userStory.properties.priority"
          )
        )}
      </p>
      <p>
        <strong>{t("userStory.properties.owner")}:</strong>{" "}
        {owner ? owner.displayName || owner.email : "N/A"}
      </p>
    </>
  );

  return (
    <BaseCard<UserStory>
      item={userStory}
      onDelete={handleDelete}
      t={t}
      additionalActions={additionalActions}
      additionalProperties={additionalProperties}
      UpdateFormComponent={UpdateUserStoryForm}
      translations={{
        edit: "userStory.actions.edit",
        delete: "userStory.actions.delete",
        deleteConfirm: "userStory.actions.deleteConfirm",
      }}
    />
  );
}
