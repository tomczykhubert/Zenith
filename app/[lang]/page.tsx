"use client";
import PageBreadcrumb from "@/components/shared/layout/pageBreadcrumb";
import { useDictionary } from "@/providers/dictionaryProvider";

export default function Home() {
  const { t } = useDictionary();
  return (
    <div>
      <PageBreadcrumb items={[]} />
      <h1 className="text-3xl font-semibold text-center mt-5">
        {t("common.homeMessage")}
      </h1>
    </div>
  );
}
