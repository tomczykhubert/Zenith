import Project from "@/types/project";
import { BaseRepository } from "./baseRepository";

export class ProjectsRepository extends BaseRepository<Project> {
  constructor() {
    super("projects");
  }
}
