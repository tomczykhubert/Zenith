"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoon, LuSun } from "react-icons/lu";
import { useDictionary } from "@/providers/dictionaryProvider";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";

export function ModeToggle() {
  const { t } = useDictionary();
  const { setTheme } = useTheme();
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-accent cursor-pointer">
              <LuSun className="block dark:hidden" />
              <LuMoon className="hidden dark:block" />
              {t("common.theme.theme")}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              {t("common.theme.light")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              {t("common.theme.dark")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              {t("common.theme.system")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
