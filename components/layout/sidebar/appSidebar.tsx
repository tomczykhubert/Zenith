import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import LangSwitcher from "./partials/langSwitcher";
import { Navigation } from "./partials/navigation";
import { UserActions } from "./partials/userActions";
import Image from "next/image";
import { ModeToggle } from "./partials/modeToggle";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader className="flex-row items-center gap-2">
            <Image src="/icon.svg" alt="Zenith Logo" width={36} height={36} />
            <span className="text-3xl">Zenith</span>
          </SidebarHeader>
        </SidebarGroup>
        <ModeToggle />
        <LangSwitcher />
        <Navigation />
        <UserActions />
      </SidebarContent>
    </Sidebar>
  );
}
