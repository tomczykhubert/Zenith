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
import { useDictionary } from "@/providers/dictionaryProvider";

const formSchema = z.object({
  name: z.coerce.string().nonempty({
    message: "project.validations.name.required",
  }),
  description: z.coerce.string().nonempty({
    message: "project.validations.description.required",
  }),
});

interface ProjectFormProps {
  initialValues?: Partial<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

function ProjectForm({
  initialValues = { name: "", description: "" },
  onSubmit,
}: ProjectFormProps) {
  const { t } = useDictionary();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

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
                    placeholder={t("project.placeholders.name")}
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
                    placeholder={t("project.placeholders.description")}
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

export { ProjectForm, formSchema };
