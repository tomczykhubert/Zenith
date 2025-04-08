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
import { useUsersStore } from "@/providers/usersProvider";
import { useAuthStore } from "@/providers/authProvider";
import { toast } from "sonner";
import PageBreadcrumb from "@/components/shared/layout/pageBreadcrumb";

const formSchema = z.object({
  displayName: z.string().min(2, {
    message: "user.validations.displayName.minLength",
  }),
  photoURL: z
    .string()
    .url({
      message: "user.validations.photoURL.invalidUrl",
    })
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Profile() {
  const { t } = useDictionary();
  const user = useAuthStore((state) => state.user);
  const updateUser = useUsersStore((state) => state.updateUser);
  const updateCurrentUser = useAuthStore((state) => state.updateCurrentUser);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const updatedUser = {
        ...user!,
        displayName: data.displayName,
        photoURL: data.photoURL || null,
      };

      await updateUser(updatedUser);
      updateCurrentUser(updatedUser);
      toast.success(t("user.toast.profileUpdate.success"));
    } catch {
      toast.error(t("user.toast.profileUpdate.failed"));
    }
  };

  if (!user) {
    return <div className="text-center mt-5">{t("user.notFound")}</div>;
  }

  const breadcrumbItems = [
    {
      label: t("user.profile"),
    },
  ];

  return (
    <>
      <PageBreadcrumb items={breadcrumbItems} />
      <div className="max-w-[525px] mx-auto mt-5">
        <h1 className="text-3xl mb-5">{t("user.profile")}</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("user.displayName")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("user.displayNamePlaceholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photoURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("user.photoURL")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("user.photoURLPlaceholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">{t("common.submit")}</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
