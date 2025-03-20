"use client";
import { useDictionary } from "@/providers/dictionaryProvider";

export default function Home() {
  const { t } = useDictionary();
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mt-5">
        {t("common.home")}
      </h1>
    </div>
  );
}
