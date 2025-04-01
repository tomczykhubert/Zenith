"use client";
import Title from "@/components/blocks/common/title";
import CreateUserStoryForm from "@/components/blocks/userStory/forms/createUserStoryForm";
import UserStoriesGrid from "@/components/blocks/userStory/userStoriesGrid";
import ActionIcon from "@/components/ui/actionIcon";
import FormModal from "@/components/ui/modals/formModal";
import { useAuthStore } from "@/providers/authProvider";
import { useDictionary } from "@/providers/dictionaryProvider";
import { useProjectsStore } from "@/providers/projectsProvider";
import { useUsersStoretoriesStore } from "@/providers/userStoriesProvider";
import UserStory from "@/types/userStory";
import { useState } from "react";
import { GiNotebook } from "react-icons/gi";

export default function UserStories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useDictionary();

  const user = useAuthStore((state) => state.user);
  const userStories: UserStory[] = useUsersStoretoriesStore(
    (state) => state.userStories
  );
  const activeProject = useProjectsStore((state) =>
    state.getProjectById(user!.activeProjectId!)
  );

  if (!activeProject) return;
  return (
    <>
      <div className="flex justify-between items-center">
        <Title
          title={t("userStory.userStories")}
          subtitle={activeProject.name}
        />
        <ActionIcon
          Icon={GiNotebook}
          onClick={() => setIsModalOpen(true)}
          text={t("userStory.actions.create")}
        />
      </div>
      <UserStoriesGrid userStories={userStories} />
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header={t("userStory.actions.create")}
      >
        <CreateUserStoryForm
          projectId={activeProject.id}
          ownerId={user!.id}
          onClose={() => setIsModalOpen(false)}
        />
      </FormModal>
    </>
  );
}
