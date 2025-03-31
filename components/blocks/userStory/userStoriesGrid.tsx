import UserStory from "@/types/userStory";
import UserStoryCard from "./userStoryCard";
import GridColumn from "../gridColumn";
import { useDictionary } from "@/providers/dictionaryProvider";
import { UserStoryStatus } from "@prisma/client";

export default function UserStoriesGrid({
  userStories,
}: {
  userStories: UserStory[];
}) {
  const { t } = useDictionary();

  if (userStories.length === 0) {
    return <p className="text-center mt-5">{t("userStory.null.all")}</p>;
  }

  const pendingStories = userStories.filter(
    (userStory) => userStory.status === UserStoryStatus.PENDING
  );
  const inProgressStories = userStories.filter(
    (userStory) => userStory.status === UserStoryStatus.IN_PROGRESS
  );
  const completedStories = userStories.filter(
    (userStory) => userStory.status === UserStoryStatus.COMPLETED
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <GridColumn
        items={pendingStories}
        header={t("userStory.properties.status.pending")}
        emptyMessage={t("userStory.null.pending")}
        Element={UserStoryCard}
      />
      <GridColumn
        items={inProgressStories}
        header={t("userStory.properties.status.inProgress")}
        emptyMessage={t("userStory.null.inProgress")}
        Element={UserStoryCard}
      />
      <GridColumn
        items={completedStories}
        header={t("userStory.properties.status.completed")}
        emptyMessage={t("userStory.null.completed")}
        Element={UserStoryCard}
      />
    </div>
  );
}
