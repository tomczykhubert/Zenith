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
import { useTaskSelectPriorities } from "@/types/task";
import { Select } from "@/components/shared/elements/forms/select";
import { useDictionary } from "@/providers/dictionaryProvider";
import { TaskPriority } from "@prisma/client";

const formSchema = z.object({
  name: z.coerce.string().nonempty({
    message: "task.validations.name.required",
  }),
  description: z.coerce.string().nonempty({
    message: "task.validations.description.required",
  }),
  priority: z.nativeEnum(TaskPriority, {
    required_error: "task.validations.priority.required!",
    message: "task.validations.priority.invalid",
  }),
  estimatedTime: z.coerce.number().positive({
    message: "task.validations.estimatedTime.invalid",
  }),
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

  const priorityOptions = useTaskSelectPriorities();
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
                <FormLabel>{t("task.properties.priority.priority")}</FormLabel>
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
          <Button type="submit">{t("common.submit")}</Button>
        </form>
      </Form>
    </>
  );
}

export { TaskForm, formSchema };
