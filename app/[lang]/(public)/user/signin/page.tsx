"use client";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/forms/input";
import { Button } from "@/components/ui/forms/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms/form";
import { Error } from "@/components/blocks/error";
import { auth } from "@/lib/firebase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FirebaseError } from "firebase/app";
import { useUserStore } from "@/providers/userProvider";
import { routes, useLocalizedRoute } from "@/utils/routes";
import { useDictionary } from "@/providers/dictionaryProvider";

const formSchema = z.object({
  email: z.coerce.string().nonempty({
    message: "user.validations.email",
  }),
  password: z.coerce.string().nonempty({
    message: "user.validations.password",
  }),
});

export default function SignInForm() {
  const { t } = useDictionary();
  const [error, setError] = useState<{ code?: string; message: string } | null>(
    null
  );
  const user = useUserStore((state) => state.currentUser);
  const params = useSearchParams();
  const router = useRouter();
  const returnUrl = params.get("returnUrl");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const home = useLocalizedRoute(routes.home);
  const verify = useLocalizedRoute(routes.userVerify);

  if (user) {
    return null;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form["email"].value;
    const password = form["password"].value;

    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (returnUrl) {
        router.push(returnUrl);
      } else {
        router.push(home);
      }
      if (!userCredential.user.emailVerified) {
        router.push(verify);
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;
      setError({ code: firebaseError.code, message: firebaseError.message });
    }
  };

  return (
    <div className="mt-5 max-w-[525px] mx-auto">
      <h1 className="text-3xl mb-5">{t("user.signIn")}</h1>
      {error ? <Error error={error} /> : null}
      <Form {...form}>
        <form onSubmit={onSubmit} className="">
          <FormItem className="mb-4">
            <FormLabel>{t("user.email")}</FormLabel>
            <FormControl>
              <Input
                type="email"
                name="email"
                placeholder={t("user.emailPlaceholder")}
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
                name="password"
                placeholder={t("user.passwordPlaceholder")}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <div>
            <Button type="submit">{t("user.signIn")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
