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
import { Input } from "@/components/ui/forms/input";
import { Textarea } from "@/components/ui/forms/textarea";
import { useForm } from "react-hook-form";
import {
  TaskPriority,
  TaskStatus,
  useTaskSelectPriorities,
  useTaskSelectStatuses,
} from "@/types/task";
import { Select } from "@/components/ui/forms/select";
import { useProjectsStore } from "@/providers/projectsProvider";
import { useUserStoriesStore } from "@/providers/userStoriesProvider";
import { useDictionary } from "@/providers/dictionaryProvider";
import { mapUsersToSelect } from "@/types/user";
import { useUserStore } from "@/providers/userProvider";

const formSchema = z.object({
  name: z.coerce.string().nonempty({
    message: "task.validations.name.required",
  }),
  description: z.coerce.string(),
  priority: z.nativeEnum(TaskPriority, {
    required_error: "task.validations.priority.required!",
    message: "task.validations.priority.invalid",
  }),
  status: z.nativeEnum(TaskStatus, {
    required_error: "task.validations.status.required!",
    message: "task.validations.status.invalid",
  }),
  estimatedTime: z.coerce.number().positive({
    message: "task.validations.estimatedTime.invalid",
  }),
  projectId: z.string(),
  userId: z.string(),
  userStoryId: z.string(),
});

interface TaskFormProps {
  initialValues?: Partial<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export default function TaskForm({ initialValues, onSubmit }: TaskFormProps) {
  const { t } = useDictionary();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const projects = useProjectsStore((state) => state.projects);
  const projectOptions = projects.map((project) => ({
    value: project.uid,
    label: project.name,
  }));

  // const userStories = filterBySpecification(
  //   useUserStoriesStore((state) => state.userStories),
  //   { projectId: initialValues?.projectId }
  // );
  const userStories = useUserStoriesStore((state) => state.userStories);

  const userStoriesOptions = userStories.map((userStory) => ({
    value: userStory.uid,
    label: userStory.name,
  }));

  const statusOptions = useTaskSelectStatuses();

  const priorityOptions = useTaskSelectPriorities();

  const users = useUserStore((state) => state.users);
  const userOptions = mapUsersToSelect(users);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common.properties.name")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("task.placeholders.name")}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common.properties.description")}</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    className="resize-none"
                    placeholder={t("task.placeholders.description")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("task.properties.status.status")}</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    options={priorityOptions}
                    selected={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("task.properties.status.status")}</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    options={statusOptions}
                    selected={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estimatedTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("task.properties.estimatedTime")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={t("task.placeholders.estimatedTime")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("project.project")}</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    options={projectOptions}
                    selected={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("user.user")}</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    options={userOptions}
                    selected={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userStoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("userStory.userStory")}</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    options={userStoriesOptions}
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

export { TaskForm, formSchema };
