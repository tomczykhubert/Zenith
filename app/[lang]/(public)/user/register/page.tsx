"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms/form";
import { Input } from "@/components/ui/forms/input";
import { Button } from "@/components/ui/forms/button";
import { Error } from "@/components/blocks/error";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUserStore } from "@/providers/userProvider";
import { User, UserRole } from "@/types/user";
import { routes, useLocalizedRoute } from "@/utils/routes";
import { useDictionary } from "@/providers/dictionaryProvider";

const formSchema = z.object({
  email: z.coerce.string().nonempty({
    message: "user.validations.email.required",
  }),
  password: z.coerce.string().nonempty({
    message: "user.validations.password.required",
  }),
  confirmPassword: z.coerce.string().nonempty({
    message: "user.validations.confirmPassword.required",
  }),
});

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FirebaseError {
  code: string;
  message: string;
}

export default function RegisterForm() {
  const [error, setError] = useState<FirebaseError | null>(null);
  const addUser = useUserStore((store) => store.addUser);
  const { t } = useDictionary();
  const user = useUserStore((state) => state.currentUser);
  const router = useRouter();

  const redirect = useLocalizedRoute(routes.userVerify);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  if (user) {
    return null;
  }

  const onSubmit = async (data: FormData) => {
    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError({
        code: "password-mismatch",
        message: t("user.validations.password.mismatch"),
      });
      return;
    }
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user: User = {
        uid: credential.user.uid,
        email: credential.user.email,
        displayName: "",
        role: UserRole.DEVELOPER,
        photoURL: "",
      };

      addUser(user);
      await sendEmailVerification(auth.currentUser!);
      router.push(redirect);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      setError({ code: firebaseError.code, message: firebaseError.message });
    }
  };

  return (
    <div className="mt-5 max-w-[525px] mx-auto">
      <h1 className="text-3xl mb-5">{t("user.createAccount")}</h1>
      {error ? <Error error={error} /> : null}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormItem className="mb-4">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                {...form.register("email")}
                placeholder="Email"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem className="mb-4">
            <FormLabel>{t("user.password")}</FormLabel>
            <FormControl>
              <Input
                type="password"
                {...form.register("password")}
                placeholder={t("user.password")}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem className="mb-4">
            <FormLabel>{t("user.confirmPassword")}</FormLabel>
            <FormControl>
              <Input
                type="password"
                {...form.register("confirmPassword")}
                placeholder={t("user.confirmPassword")}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <div className="mb-10">
            <Button type="submit">{t("user.signUp")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
