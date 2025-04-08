import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { routes } from "@/lib/routes/routes";
import { useDictionary } from "@/providers/dictionaryProvider";
import { FaHome } from "react-icons/fa";
import { LuLayoutDashboard, LuNotebook } from "react-icons/lu";

export function Navigation() {
  const { t } = useDictionary();
  const items = [
    {
      href: routes.home,
      title: t("common.home"),
      icon: FaHome,
    },
    {
      href: routes.projects.index,
      title: t("project.projects"),
      icon: LuLayoutDashboard,
    },
    {
      href: routes.userStories.index,
      title: t("userStory.userStories"),
      icon: LuNotebook,
    },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("common.application")}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
