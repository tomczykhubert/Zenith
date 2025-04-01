import { useLocalizedRoute } from "@/lib/routes/localizedRoute";
import NavbarDesktop from "./partials/navbarDesktop";
import NavbarMobile from "./partials/navbarMobile";
import { routes } from "@/lib/routes/routes";
import { useDictionary } from "@/providers/dictionaryProvider";
import User from "@/types/user";
import { useAuthStore } from "@/providers/authProvider";

export interface NavbarBaseProps {
  links: readonly {
    href: string;
    text: string;
  }[];
  user: User | null;
}

const Navbar = () => {
  const { t } = useDictionary();
  const user = useAuthStore((state) => state.user);
  const navigationLinks = [
    {
      href: useLocalizedRoute(routes.projects.list),
      text: t("project.projects"),
    },
    {
      href: useLocalizedRoute(routes.userStories.list),
      text: t("userStory.userStories"),
    },
  ] as const;
  return (
    <>
      <NavbarMobile links={navigationLinks} user={user} />
      <NavbarDesktop links={navigationLinks} user={user} />
    </>
  );
};

export default Navbar;
