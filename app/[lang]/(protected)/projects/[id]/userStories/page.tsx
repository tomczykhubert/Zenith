"use client";
import Title from "@/components/blocks/title";
import CreateUserStoryForm from "@/components/blocks/userStory/forms/createUserStoryForm";
import UserStoriesGrid from "@/components/blocks/userStory/userStoriesGrid";
import ActionIcon from "@/components/ui/actionIcon";
import FormModal from "@/components/ui/modals/formModal";
import { useDictionary } from "@/providers/dictionaryProvider";
import { useProjectsStore } from "@/providers/projectsProvider";
import { useUserStoriesStore } from "@/providers/userStoriesProvider";
import Project from "@/types/project";
import UserStory from "@/types/userStory";
import { routes } from "@/utils/routes";
import { useParams } from "next/navigation";
import { useState } from "react";
import { GiNotebook } from "react-icons/gi";

export default function UserStories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { t } = useDictionary();
  const project: Project | null = useProjectsStore((state) =>
    state.getProjectById(id?.toString() || "")
  );

  const userStories: UserStory[] = useUserStoriesStore(
    (state) => state.userStories
  );

  if (!project) {
    return <p className="text-center mt-5">Project not found.</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Title
          title={t("userStory.userStories")}
          subtitle={project.name}
          backUrl={routes.projects}
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
          projectId={id?.toString() || ""}
          userId=""
          onClose={() => setIsModalOpen(false)}
        />
      </FormModal>
    </>
  );
}
