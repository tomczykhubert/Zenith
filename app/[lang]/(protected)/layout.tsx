"use client";
import Spinner from "@/components/blocks/spinner";
import { useUserStore } from "@/providers/userProvider";
import { routes, useLocalizedRoute } from "@/utils/routes";
import { redirect, usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Protected({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = useUserStore((state) => state.currentUser);
  const returnUrl = usePathname();
  const localizedRedirect = useLocalizedRoute(routes.userSignIn);
  useLayoutEffect(() => {
    if (!currentUser) {
      return redirect(`${localizedRedirect}?returnUrl=${returnUrl}`);
    }
  });
  if (!currentUser) return <Spinner />;
  return <>{children}</>;
}
