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
import { signIn } from "@/lib/auth/authClient";
import { useRouter } from "next/navigation";
import SignInSchema from "@/helpers/zod/signInSchema";
import { routes } from "@/lib/routes/routes";
import { FaGoogle } from "react-icons/fa";
import { useDictionary } from "@/providers/dictionaryProvider";

const SignIn = () => {
  const router = useRouter();
  const {
    error,
    success,
    loading,
    setSuccess,
    setError,
    setLoading,
    resetState,
  } = useAuthState();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { t } = useDictionary();

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    try {
      await signIn.email(
        {
          email: values.email,
          password: values.password,
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
            setSuccess("LoggedIn successfully");
            router.replace(routes.home);
          },
          onError: (ctx) => {
            setError(ctx.error.message);
          },
        }
      );
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: routes.home,
    });
  };

  return (
    <CardWrapper
      cardTitle={t("user.signIn")}
      cardFooterDescription={t("user.noAccountYet")}
      cardFooterLink="/auth/signUp"
      cardFooterLinkTitle={t("user.signUp")}
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
            {t("user.signIn")}
          </Button>
        </form>
      </Form>
      <Button
        onClick={handleGoogleSignIn}
        className="w-full mt-4"
        variant={"secondary"}
      >
        <div className="flex items-center justify-center gap-2">
          <FaGoogle />
          <span>{t("user.googleSignIn")}</span>
        </div>
      </Button>
    </CardWrapper>
  );
};

export default SignIn;
