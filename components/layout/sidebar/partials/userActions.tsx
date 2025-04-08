import { SidebarGroup } from "@/components/ui/sidebar";
import { routes } from "@/lib/routes/routes";
import { useAuthStore } from "@/providers/authProvider";
import { useDictionary } from "@/providers/dictionaryProvider";
import { LuCircleUser, LuLogIn, LuLogOut, LuUserPlus } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocalizedRoute } from "@/lib/routes/localizedRoute";

export function UserActions() {
  const { t } = useDictionary();
  const user = useAuthStore((state) => state.user);
  const signInHref = useLocalizedRoute(routes.user.signIn);
  const signUpHref = useLocalizedRoute(routes.user.register);
  const profileHref = useLocalizedRoute(routes.user.profile);
  const signOutHref = useLocalizedRoute(routes.user.signOut);
  const userActions = !user
    ? [
        {
          href: signInHref,
          title: t("user.signIn"),
          icon: LuLogIn,
          variant: "slate",
        },
        {
          href: signUpHref,
          title: t("user.signUp"),
          icon: LuUserPlus,
          variant: "blue",
        },
      ]
    : [
        {
          href: profileHref,
          title: t("user.profile"),
          icon: LuCircleUser,
          variant: "lime",
        },
        {
          href: signOutHref,
          title: t("user.signOut"),
          icon: LuLogOut,
          variant: "blue",
        },
      ];

  return (
    <SidebarGroup className="mt-auto p-4">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-accent cursor-pointer">
              <Avatar className="h-8 w-8">
                {user.photoURL ? (
                  <AvatarImage
                    src={user.photoURL}
                    alt={user.displayName || "User avatar"}
                  />
                ) : (
                  <AvatarFallback>
                    {user.displayName?.charAt(0) || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col items-start flex-1">
                <span className="text-sm font-medium">
                  {user.displayName || t("user.anonymous")}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                {user?.photoURL ? (
                  <AvatarImage
                    src={user.photoURL}
                    alt={user.displayName || "User avatar"}
                  />
                ) : (
                  <AvatarFallback>
                    {user?.displayName?.charAt(0) || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {user?.displayName || t("user.anonymous")}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
            {userActions.map((item) => (
              <DropdownMenuItem key={item.title} asChild>
                <a href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex flex-col gap-2">
          {userActions.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent text-sm"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      )}
    </SidebarGroup>
  );
}
