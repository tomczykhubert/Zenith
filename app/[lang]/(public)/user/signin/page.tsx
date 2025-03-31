"use client";

import { useSearchParams, useRouter, redirect } from "next/navigation";
import { Input } from "@/components/ui/forms/input";
import { Button } from "@/components/ui/forms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { routes } from "@/lib/routes/routes";
import { useLocalizedRoute } from "@/lib/routes/localizedRoute";
import { useDictionary } from "@/providers/dictionaryProvider";
import { useAuthStore } from "@/providers/authProvider";
import { toast } from "react-toastify";

const formSchema = z.object({
  email: z.string().email({
    message: "user.validations.email.invalid",
  }),
  password: z.string().min(1, {
    message: "user.validations.password.required",
  }),
});

type SignInFormData = z.infer<typeof formSchema>;

export default function SignInForm() {
  const { t } = useDictionary();
  const params = useSearchParams();
  const router = useRouter();

  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const returnUrl = params.get("returnUrl");
  const home = useLocalizedRoute(routes.home);

  if (user) {
    redirect(returnUrl || home);
  }

  const onSubmit = async (data: SignInFormData) => {
    try {
      await login(data.email, data.password);
      router.push(returnUrl || home);
      toast.success(t("user.toast.signIn.success"));
    } catch {
      toast.error(t("user.toast.signIn.failed"));
    }
  };

  return (
    <div className="mt-5 max-w-[525px] mx-auto">
      <h1 className="text-3xl mb-5">{t("user.signIn")}</h1>
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
          <Button type="submit" className="w-full">
            {t("user.signIn")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
