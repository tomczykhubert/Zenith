import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
import UpdateUserStoryForm from "./forms/updateUserStoryForm";
import UserStory from "@/types/userStory";
import ActionIcon from "@/components/shared/elements/actionIcon";
import { FaTasks } from "react-icons/fa";
import { useDictionary } from "@/providers/dictionaryProvider";
import { getEnumTranslationKey } from "@/lib/utils";
import { toast } from "react-toastify";
import { useUsersStore } from "@/providers/usersProvider";
import { routes } from "@/lib/routes/routes";
import BaseCard from "../../shared/base/baseCard";

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
    <ActionIcon
      variant="lime"
      href={routes.userStories.tasks.list(userStory.id)}
      Icon={FaTasks}
      text={t("task.tasks")}
    />
  );

  const additionalProperties = (
    <>
      <p className="text-muted-foreground">
        <strong>{t("userStory.properties.priority.priority")}:</strong>{" "}
        {t(
          getEnumTranslationKey(
            userStory.priority,
            "userStory.properties.priority"
          )
        )}
      </p>
      <p className="text-muted-foreground">
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
