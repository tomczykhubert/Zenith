"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { routes } from "@/lib/routes/routes";
import { useAuthStore } from "@/providers/authProvider";
import { useLocalizedRoute } from "@/lib/routes/localizedRoute";
export default function SignOut() {
  const router = useRouter();
  const localizedRoute = useLocalizedRoute(routes.home);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const signOut = async () => {
      try {
        await logout();
        router.push(localizedRoute);
      } catch (error) {
        console.error("Error signing out:", error);
        router.push(localizedRoute);
      }
    };
    signOut();
  }, [router, localizedRoute, logout]);

  return null;
}
