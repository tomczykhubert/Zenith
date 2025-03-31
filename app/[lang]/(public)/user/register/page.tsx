"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms/form";
import { Input } from "@/components/ui/forms/input";
import { Button } from "@/components/ui/forms/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { routes } from "@/lib/routes/routes";
import { useLocalizedRoute } from "@/lib/routes/localizedRoute";
import { useDictionary } from "@/providers/dictionaryProvider";
import { useAuthStore } from "@/providers/authProvider";
import { UserRole } from "@prisma/client";
import { toast } from "react-toastify";

const formSchema = z
  .object({
    email: z.string().email({
      message: "user.validations.email.invalid",
    }),
    password: z.string().min(6, {
      message: "user.validations.password.tooShort",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "user.validations.password.mismatch",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const { t } = useDictionary();
  const router = useRouter();
  const redirect = useLocalizedRoute(routes.user.signIn);

  const register = useAuthStore((state) => state.register);
  const user = useAuthStore((state) => state.user);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      router.push(redirect);
    }
  }, [user, router, redirect]);

  const onSubmit = async (data: FormData) => {
    try {
      await register(data.email, data.password, "", UserRole.ADMIN);
      router.push(redirect);
      toast.success(t("user.toast.signUp.success"));
    } catch {
      toast.error(t("user.toast.signUp.failed"));
    }
  };

  return (
    <div className="mt-5 max-w-[525px] mx-auto">
      <h1 className="text-3xl mb-5">{t("user.createAccount")}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("user.email")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("user.emailPlaceholder")}
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
                    type="password"
                    placeholder={t("user.passwordPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("user.confirmPassword")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("user.confirmPasswordPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {t("user.signUp")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
