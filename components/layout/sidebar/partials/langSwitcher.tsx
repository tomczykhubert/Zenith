"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LuLanguages } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDictionary } from "@/providers/dictionaryProvider";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";

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
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;

    const newPath =
      pathname === `/${currentLang}`
        ? `/${lang}`
        : pathname.replace(`/${currentLang}/`, `/${lang}/`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-accent cursor-pointer">
              <LuLanguages /> {t("common.language")}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top">
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
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
