import Task, { TaskStatus } from "@/types/task";
import TaskCard from "./taskCard";
import GridColumn from "../gridColumn";
import { useDictionary } from "@/providers/dictionaryProvider";

export default function TasksGrid({ tasks }: { tasks: Task[] | null }) {
  const { t } = useDictionary();

  if (!tasks || tasks.length === 0) {
    return <p className="text-center mt-5">{t("task.null.all")}</p>;
  }

  const pendingTasks =
    tasks?.filter((task) => task.status === TaskStatus.PENDING) || [];
  const inProgressTasks =
    tasks?.filter((task) => task.status === TaskStatus.IN_PROGRESS) || [];
  const completedTasks =
    tasks?.filter((task) => task.status === TaskStatus.COMPLETED) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <GridColumn
        items={pendingTasks}
        header={t("task.properties.status.pending")}
        emptyMessage={t("task.null.pending")}
        Element={TaskCard}
      />
      <GridColumn
        items={inProgressTasks}
        header={t("task.properties.status.inProgress")}
        emptyMessage={t("task.null.inProgress")}
        Element={TaskCard}
      />
      <GridColumn
        items={completedTasks}
        header={t("task.properties.status.completed")}
        emptyMessage={t("task.null.completed")}
        Element={TaskCard}
      />
    </div>
  );
}
