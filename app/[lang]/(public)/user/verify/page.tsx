"use client";

import { signOut, sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/forms/button";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/providers/userProvider";
import { routes, useLocalizedRoute } from "@/utils/routes";
import { useDictionary } from "@/providers/dictionaryProvider";

export default function VerifyEmail() {
  const { t } = useDictionary();
  const user = useUserStore((state) => state.currentUser);
  const [userVerify, setUser] = useState(user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUser(user);
      signOut(auth);
    }
  }, [user]);

  const handleResendVerification = async () => {
    if (!auth.currentUser) return;

    try {
      setIsLoading(true);
      await sendEmailVerification(auth.currentUser);
      alert(t("user.verificationEmailSent"));
    } catch {
      alert(t("user.verificationEmailError"));
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = useLocalizedRoute(routes.userSignIn);

  return (
    <div className="text-center mt-5 max-w-[525px] mx-auto">
      <h1 className="text-2xl mt-5 mb-5">
        {t("user.emailNotVerified")}{" "}
        <span className="font-semibold">{userVerify?.email}</span>
      </h1>
      <div className="mb-4 flex justify-between">
        <Button onClick={handleResendVerification} disabled={isLoading}>
          {isLoading ? t("common.loading") : t("user.resendVerification")}
        </Button>
        <Button onClick={() => router.push(signIn)}>
          {t("user.goToSignIn")}
        </Button>
      </div>
    </div>
  );
}
