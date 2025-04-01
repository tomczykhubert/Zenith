"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/shared/elements/forms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/elements/forms/form";
import { useForm } from "react-hook-form";
import Task from "@/types/task";
import { Select } from "@/components/shared/elements/forms/select";
import { useDictionary } from "@/providers/dictionaryProvider";
import { mapUsersToSelect } from "@/types/user";
import { useTasksStore } from "@/providers/tasksProvider";
import { TaskStatus } from "@prisma/client";
import { useUsersStore } from "@/providers/usersProvider";
import ID from "@/types/id";
import { toast } from "react-toastify";

const formSchema = z.object({
  assignedUserId: z.string().uuid({
    message: "task.validations.userId.required",
  }),
});

interface AssignUserFormProps {
  task: Task;
  onClose: () => void;
}

export default function AssignUserForm({ task, onClose }: AssignUserFormProps) {
  const { t } = useDictionary();
  const updateTask = useTasksStore((state) => state.updateTask);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { assignedUserId: task.assignedUserId as ID },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const assignedUserId = data.assignedUserId as ID;
    try {
      await updateTask({
        ...task,
        assignedUserId,
        status:
          task.status == TaskStatus.PENDING
            ? TaskStatus.IN_PROGRESS
            : task.status,
        startedAt: task.startedAt ?? new Date(),
      });
      toast.success(t("task.toast.assignUser.success"));
    } catch {
      toast.error(t("task.toast.assignUser.failed"));
    }
    onClose();
  };

  const users = useUsersStore((state) => state.users);
  const usersOptions = mapUsersToSelect(users);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="assignedUserId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("user.user")}</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    options={usersOptions}
                    selected={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{t("common.submit")}</Button>
        </form>
      </Form>
    </>
  );
}

export { AssignUserForm };
