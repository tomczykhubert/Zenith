"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { routes } from "@/lib/routes/routes";
import { useAuthStore } from "@/providers/authProvider";
import { useLocalizedRoute } from "@/lib/routes/localizedRoute";
import { toast } from "react-toastify";
import { useDictionary } from "@/providers/dictionaryProvider";
export default function SignOut() {
  const router = useRouter();
  const localizedRoute = useLocalizedRoute(routes.home);
  const logout = useAuthStore((state) => state.logout);
  const { t } = useDictionary();
  useEffect(() => {
    const signOut = async () => {
      try {
        await logout();
        toast.success(t("user.toast.signOut.success"));
        router.push(localizedRoute);
      } catch (error) {
        console.error("Error signing out:", error);
        toast.error(t("user.toast.signOut.failed"));
        router.push(localizedRoute);
      }
    };
    signOut();
  }, [router, localizedRoute, logout, t]);

  return null;
}
