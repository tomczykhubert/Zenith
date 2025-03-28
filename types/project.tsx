import { BaseDto } from "./base";

export default interface Project extends BaseDto {
  name: string;
  description: string;
}

export function mapProjectsToSelect(projects: Project[]) {
  return projects.map((project) => {
    return {
      label: project.name,
      value: project.id,
    };
  });
}
