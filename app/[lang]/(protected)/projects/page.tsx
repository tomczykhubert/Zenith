"use client";
import CreateProjectForm from "@/components/blocks/project/forms/createProjectForm";
import ProjectsGrid from "@/components/blocks/project/projectsGrid";
import Title from "@/components/blocks/title";
import ActionIcon from "@/components/ui/actionIcon";
import FormModal from "@/components/ui/modals/formModal";
import { useProjectsStore } from "@/providers/projectsProvider";
import { useDictionary } from "@/providers/dictionaryProvider";
import Project from "@/types/project";
import { useState } from "react";
import { MdAddBusiness } from "react-icons/md";

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useDictionary();

  const projects: Project[] | null = useProjectsStore(
    (state) => state.projects
  );

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <Title title={t("project.projects")} />
          <ActionIcon
            Icon={MdAddBusiness}
            onClick={() => setIsModalOpen(true)}
            text={t("project.actions.create")}
          />
        </div>
        <ProjectsGrid projects={projects} />
        <FormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          header={t("project.actions.create")}
        >
          <CreateProjectForm onClose={() => setIsModalOpen(false)} />
        </FormModal>
      </div>
    </>
  );
}
