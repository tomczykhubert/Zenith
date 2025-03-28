"use client";
import { useParams } from "next/navigation";

export const useLocalizedRoute = (route: string) => {
  const lang = useParams().lang as string;
  return `/${lang}${route}`;
};
