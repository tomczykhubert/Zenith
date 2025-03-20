"use client";

import { useState } from "react";
import { useUserStore } from "@/providers/userProvider";
import { auth } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDictionary } from "@/providers/dictionaryProvider";
import { Error } from "@/components/blocks/error";
import { FirebaseError } from "firebase/app";
import Image from "next/image";

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
  const user = useUserStore((state) => state.currentUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const [error, setError] = useState<FirebaseError | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (!auth.currentUser || !user) return;

      await updateProfile(auth.currentUser, {
        displayName: data.displayName,
        photoURL: data.photoURL || null,
      });

      const updatedUser = {
        ...user,
        displayName: data.displayName,
        photoURL: data.photoURL || null,
      };

      await updateUser(updatedUser);
      setSuccess(true);
      setError(null);
    } catch (err) {
      const firebaseError = err as FirebaseError;
      setError({
        code: firebaseError.code || "unknown-error",
        message: firebaseError.message || "Failed to update profile",
        name: firebaseError.name || "FirebaseError",
      });
      setSuccess(false);
    }
  };

  if (!user) {
    return <div className="text-center mt-5">{t("user.notFound")}</div>;
  }

  return (
    <div className="max-w-[525px] mx-auto mt-5">
      <h1 className="text-3xl mb-5 flex items-center space-x-2">
        <span style={{ letterSpacing: "0.1px" }}>{t("user.profile")}</span>
        {user.photoURL && (
          <div>
            <Image
              width={75}
              height={75}
              src={user.photoURL}
              alt={user.displayName || "Profile"}
              className="rounded-full object-cover"
            />
          </div>
        )}
      </h1>
      {error && <Error error={error} />}
      {success && (
        <div className="text-green-500 mb-4">{t("user.profileUpdated")}</div>
      )}
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
  );
}
