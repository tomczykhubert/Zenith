"use client";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import { routes } from "@/utils/routes";
import { useLocalizedRoute } from "@/utils/routes";
export default function SignOut() {
  const router = useRouter();
  const localizedRoute = useLocalizedRoute(routes.home);
  useEffect(() => {
    const signOut = async () => {
      try {
        await auth.signOut();
        router.push(localizedRoute);
      } catch (error) {
        console.error("Error signing out:", error);
        router.push(localizedRoute);
      }
    };
    signOut();
  }, [router, localizedRoute]);

  return null;
}
