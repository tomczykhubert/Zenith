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
  UserStoryPriority,
  UserStoryStatus,
  useUserStorySelectPriorities,
  useUserStorySelectStatuses,
} from "@/types/userStory";
import { Select } from "@/components/ui/forms/select";
import { useProjectsStore } from "@/providers/projectsProvider";
import { useDictionary } from "@/providers/dictionaryProvider";
import { mapUsersToSelect } from "@/types/user";
import { mapProjectsToSelect } from "@/types/project";
import { useUserStore } from "@/providers/userProvider";

const formSchema = z.object({
  name: z.coerce.string().nonempty({
    message: "userStory.validations.name.required",
  }),
  description: z.coerce.string(),
  priority: z.nativeEnum(UserStoryPriority, {
    required_error: "userStory.validations.priority.required",
    message: "userStory.validations.priority.invalid",
  }),
  status: z.nativeEnum(UserStoryStatus, {
    required_error: "userStory.validations.status.required",
    message: "userStory.validations.status.invalid",
  }),
  projectId: z.string(),
});

interface UserStoryFormProps {
  initialValues?: Partial<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

function UserStoryForm({ initialValues, onSubmit }: UserStoryFormProps) {
  const { t } = useDictionary();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  const projects = useProjectsStore((state) => state.projects);
  const projectOptions = mapProjectsToSelect(projects);

  const users = useUserStore((state) => state.users);

  const userOptions = mapUsersToSelect(users);
  const priorityOptions = useUserStorySelectPriorities();
  const statusOptions = useUserStorySelectStatuses();
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>{t("common.properties.name")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("userStory.placeholders.name")}
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
              <FormItem className="mb-4">
                <FormLabel>{t("common.properties.description")}</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    className="resize-none"
                    placeholder={t("userStory.placeholders.description")}
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
              <FormItem className="mb-4">
                <FormLabel>{t("project.project")}</FormLabel>
                <FormControl>
                  <Select
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
            name="priority"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  {t("userStory.properties.priority.priority")}
                </FormLabel>
                <FormControl>
                  <Select
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
              <FormItem className="mb-4">
                <FormLabel>{t("userStory.properties.status.status")}</FormLabel>
                <FormControl>
                  <Select
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
            name="status"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>{t("user.user")}</FormLabel>
                <FormControl>
                  <Select
                    options={userOptions}
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

export { UserStoryForm, formSchema };
