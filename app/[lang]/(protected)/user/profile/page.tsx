"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDictionary } from "@/providers/dictionaryProvider";
import { toast } from "sonner";
import PageBreadcrumb from "@/components/shared/layout/pageBreadcrumb";
import { useSession, updateUser } from "@/lib/auth/authClient";
import Spinner from "@/components/shared/elements/spinner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "user.validations.name.minLength",
  }),
  image: z
    .string()
    .url({
      message: "user.validations.image.invalidUrl",
    })
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Profile() {
  const { t } = useDictionary();
  const { data, isPending } = useSession();
  const user = data!.user;
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      image: user.image || "",
    },
  });
  const onSubmit = async (data: FormData) => {
    const { email, ...userWithoutEmail } = user;
    try {
      const updatedUser = {
        ...userWithoutEmail,
        name: data.name,
        image: data.image || null,
      };

      const { error } = await updateUser(updatedUser);
      if (error) {
        throw error;
      }

      toast.success(t("user.toast.profileUpdate.success"));
    } catch {
      toast.error(t("user.toast.profileUpdate.error"));
    }
  };

  const breadcrumbItems = [
    {
      label: t("user.profile"),
    },
  ];

  if (isPending) return <Spinner />;
  return (
    <>
      <PageBreadcrumb items={breadcrumbItems} />

      <div className="max-w-[525px] mx-auto mt-5">
        <h1 className="text-3xl mb-5">{t("user.profile")}</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("user.name")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("user.namePlaceholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("user.image")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("user.imagePlaceholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm text-muted-foreground">
              {t("user.role")}: {t("user.roles." + user?.role.toLowerCase())}
            </p>
            <Button type="submit">{t("common.submit")}</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
