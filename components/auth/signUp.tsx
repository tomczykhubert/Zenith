"use client";
import React from "react";
import CardWrapper from "../shared/cardWrapper";
import FormError from "../shared/forms/formError";
import FormSuccess from "../shared/forms/formSuccess";
// import { FcGoogle } from "react-icons/fc";
// import SocialButton from "./social-button";
// import { FaGithub } from "react-icons/fa";
import { useAuthState } from "@/hooks/useAuthState";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SignupSchema } from "@/helpers/zod/signUpSchema";
import { signUp } from "@/lib/auth/authClient";
import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";
import { routes } from "@/lib/routes/routes";
import { useDictionary } from "@/providers/dictionaryProvider";

const SignUp = () => {
  const router = useRouter();
  const {
    error,
    success,
    loading,
    setLoading,
    setError,
    setSuccess,
    resetState,
  } = useAuthState();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    try {
      await signUp.email(
        {
          name: values.name,
          email: values.email,
          password: values.password,
          role: UserRole.DEVELOPER,
        },
        {
          onResponse: () => {
            setLoading(false);
          },
          onRequest: () => {
            resetState();
            setLoading(true);
          },
          onSuccess: () => {
            setSuccess("User has been created");
            router.replace(routes.auth.signIn);
          },
          onError: (ctx) => {
            setError(ctx.error.message);
          },
        }
      );
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };

  const { t } = useDictionary();

  return (
    <CardWrapper
      cardTitle={t("user.signUp")}
      cardDescription={t("user.signUpDescription")}
      cardFooterLink={routes.auth.signIn}
      cardFooterDescription={t("user.alreadyHaveAccount")}
      cardFooterLinkTitle={t("user.signIn")}
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("user.fullName")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="text"
                    placeholder="john"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("user.email")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("user.password")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={loading} type="submit" className="w-full">
            {t("user.signUp")}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignUp;
