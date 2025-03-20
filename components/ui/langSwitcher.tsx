"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "./forms/button";
import { useState } from "react";
import { LuLanguages } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./forms/dropdown";
import { useDictionary } from "@/providers/dictionaryProvider";
import { Tooltip } from "react-tooltip";

const languages = [
  { code: "en", label: "English" },
  { code: "pl", label: "Polski" },
];

export default function LangSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useDictionary();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLang = params.lang as string;

  const switchLanguage = (lang: string) => {
    const newPath =
      pathname === `/${currentLang}`
        ? `/${lang}`
        : pathname.replace(`/${currentLang}/`, `/${lang}/`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="px-6 py-3 rounded-md text-slate-700 cursor-pointer transition-colors bg-green-300 hover:bg-green-500"
          data-tooltip-content={t("common.changeLanguage")}
          data-tooltip-id="lang-switcher"
        >
          <LuLanguages size={16} />
          <Tooltip id="lang-switcher" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={currentLang === lang.code ? "bg-accent" : ""}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
