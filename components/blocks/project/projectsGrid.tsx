import Project from "@/types/project";
import ProjectCard from "./projectCard";
import { useDictionary } from "@/providers/dictionaryProvider";

export default function ProjectsGrid({
  projects,
}: {
  projects: Project[] | null;
}) {
  const { t } = useDictionary();

  if (!projects) {
    return <p className="text-center mt-5">{t("project.noProjects")}</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </>
  );
}
