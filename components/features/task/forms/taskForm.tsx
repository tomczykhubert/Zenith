"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDictionary } from "@/providers/dictionaryProvider";
import { TaskPriority } from "@prisma/client";
import { useTaskSelectPriorities } from "@/types/task";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";

const formSchema = z.object({
  name: z.coerce.string().nonempty({
    message: "task.validations.name.required",
  }),
  description: z.coerce.string().nonempty({
    message: "task.validations.description.required",
  }),
  priority: z.nativeEnum(TaskPriority, {
    required_error: "task.validations.priority.required",
    message: "task.validations.priority.invalid",
  }),
  estimatedTime: z.coerce.number().min(0, {
    message: "task.validations.estimatedTime.invalid",
  }),
});

interface TaskFormProps {
  initialValues?: Partial<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  title: string;
  trigger: React.ReactElement;
}

function TaskForm({ initialValues, onSubmit, title, trigger }: TaskFormProps) {
  const [open, setOpen] = useState(false);
  const { t } = useDictionary();
  const priorityOptions = useTaskSelectPriorities();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values);
    form.reset(values);
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      form.reset(initialValues);
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
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
                  <FormLabel>
                    {t("task.properties.priority.priority")}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("task.placeholders.priority")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {priorityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
      </DialogContent>
    </Dialog>
  );
}

export { TaskForm, formSchema };
