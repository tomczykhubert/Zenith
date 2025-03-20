"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/forms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms/form";
import { useForm } from "react-hook-form";
import Task, { TaskStatus } from "@/types/task";
import { Select } from "@/components/ui/forms/select";
import { useDictionary } from "@/providers/dictionaryProvider";
import { mapUsersToSelect } from "@/types/user";
import { useTasksStore } from "@/providers/tasksProvider";
import { useUserStore } from "@/providers/userProvider";

const formSchema = z.object({
  userId: z.string().nonempty({
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
    defaultValues: { userId: task.userId },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    updateTask({
      ...task,
      userId: data.userId,
      status:
        task.status == TaskStatus.PENDING
          ? TaskStatus.IN_PROGRESS
          : task.status,
      startedAt: task.startedAt ?? Date.now(),
    });
    onClose();
  };

  const users = useUserStore((state) => state.users);
  const usersOptions = mapUsersToSelect(users);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="userId"
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
