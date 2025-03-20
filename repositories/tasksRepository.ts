import Task from "@/types/task";
import { BaseRepository } from "./baseRepository";

export class TasksRepository extends BaseRepository<Task> {
  constructor() {
    super("tasks");
  }
}
