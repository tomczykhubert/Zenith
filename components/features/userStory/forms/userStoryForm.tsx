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
import { Input } from "@/components/shared/elements/forms/input";
import { Textarea } from "@/components/shared/elements/forms/textarea";
import { useForm } from "react-hook-form";
import {
  useUsersStoretorySelectPriorities,
  useUsersStoretorySelectStatuses,
} from "@/types/userStory";
import { Select } from "@/components/shared/elements/forms/select";
import { useDictionary } from "@/providers/dictionaryProvider";
import { UserStoryPriority, UserStoryStatus } from "@prisma/client";

const formSchema = z.object({
  name: z.coerce.string().nonempty({
    message: "userStory.validations.name.required",
  }),
  description: z.coerce.string().nonempty({
    message: "userStory.validations.description.required",
  }),
  priority: z.nativeEnum(UserStoryPriority, {
    required_error: "userStory.validations.priority.required",
    message: "userStory.validations.priority.invalid",
  }),
  status: z.nativeEnum(UserStoryStatus, {
    required_error: "userStory.validations.status.required",
    message: "userStory.validations.status.invalid",
  }),
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
  const priorityOptions = useUsersStoretorySelectPriorities();
  const statusOptions = useUsersStoretorySelectStatuses();

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
            name="priority"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  {t("userStory.properties.priority.priority")}
                </FormLabel>
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
              <FormItem className="mb-4">
                <FormLabel>{t("userStory.properties.status.status")}</FormLabel>
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
          <Button type="submit">{t("common.submit")}</Button>
        </form>
      </Form>
    </>
  );
}

export { UserStoryForm, formSchema };
