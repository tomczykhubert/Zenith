import UserStory from "@/types/userStory";
import { BaseRepository } from "./baseRepository";

export class UserStoriesRepository extends BaseRepository<UserStory> {
  constructor() {
    super("userStories");
  }
}
