import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
import { useState } from "react";
import FormModal from "@/components/ui/modals/formModal";
import UpdateUserStoryForm from "./forms/updateUserStoryForm";
import ConfirmModal from "@/components/ui/modals/confirmModal";
import UserStory from "@/types/userStory";
import ActionIcon from "@/components/ui/actionIcon";
import { FaTrash, FaEdit, FaTasks } from "react-icons/fa";
import { useDictionary } from "@/providers/dictionaryProvider";
import { getEnumTranslationKey } from "@/lib/utils";
import { toast } from "react-toastify";
import { useUsersStore } from "@/providers/usersProvider";
import { routes } from "@/lib/routes/routes";
import BaseCard from "../baseCard";

export default function UserStoryCard(userStory: UserStory) {
  const deleteUserStory = useUsersStoretoriesStore(
    (state) => state.deleteUserStory
  );
  const owner = useUsersStore((state) => state.getUserById(userStory.ownerId));
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = () => {
    try {
      deleteUserStory(userStory.id);
      toast.success(t("userStory.toast.delete.success"));
    } catch {
      toast.error(t("userStory.toast.delete.failed"));
    }

    setIsDeleteModalOpen(false);
  };

  const { t } = useDictionary();

  return (
    <>
      <BaseCard>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3  ">
          <h2 className="text-xl font-bold text-foreground max-w-full order-2 sm:order-1">
            {userStory.name}
          </h2>
          <div className="flex flex-wrap gap-2 order-1 sm:order-2">
            <ActionIcon
              variant="lime"
              href={routes.userStories.tasks.list(userStory.id)}
              Icon={FaTasks}
              text={t("task.tasks")}
            />
            <ActionIcon
              onClick={() => setIsUpdateModalOpen(true)}
              Icon={FaEdit}
              variant="blue"
              text={t("userStory.actions.edit")}
            />
            <ActionIcon
              onClick={() => setIsDeleteModalOpen(true)}
              Icon={FaTrash}
              variant="danger"
              text={t("userStory.actions.delete")}
            />
          </div>
        </div>
        <p className="text-muted-foreground mb-3">{userStory.description}</p>
        <p className="text-muted-foreground mb-3">
          <strong>{t("userStory.properties.priority.priority")}:</strong>{" "}
          {t(
            getEnumTranslationKey(
              userStory.priority,
              "userStory.properties.priority"
            )
          )}
        </p>
        <p className="text-muted-foreground mb-3">
          <strong>{t("userStory.properties.owner")}:</strong>{" "}
          {owner ? owner.displayName || owner.email : "N/A"}
        </p>
        <p className="text-muted-foreground mb-3">
          <strong>{t("common.properties.createdAt")}:</strong>{" "}
          {new Date(userStory.createdAt).toLocaleString()}
        </p>
        <p className="text-muted-foreground mb-3">
          <strong>{t("common.properties.updatedAt")}:</strong>{" "}
          {new Date(
            userStory.updatedAt ? userStory.updatedAt : "now"
          ).toLocaleString()}
        </p>
      </BaseCard>
      <ConfirmModal
        header={t("userStory.actions.delete")}
        message={t("userStory.actions.deleteConfirm")}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
      <FormModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        header={t("userStory.actions.edit")}
      >
        <UpdateUserStoryForm
          userStory={userStory}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      </FormModal>
    </>
  );
}
