"use client";

import Link from "next/link";
import { LuCircleUser, LuLogIn, LuLogOut, LuUserPlus } from "react-icons/lu";
import { routes, useLocalizedRoute } from "@/utils/routes";
import ActionIcon from "../ui/actionIcon";
import { useDictionary } from "@/providers/dictionaryProvider";
import { useUserStore } from "@/providers/userProvider";
import { User } from "@/types/user";
import LangSwitcher from "../ui/langSwitcher";

const Header = () => {
  const user: User | null = useUserStore((state) => state.currentUser);
  const { t } = useDictionary();
  return (
    <header className="flex justify-between px-6 py-3 bg-gray-700 shadow-md">
      <div className="flex items-center space-x-4">
        <LangSwitcher />
        <h1 className="text-3xl font-bold text-slate-100 hover:text-slate-400 transition-colors flex space-x-2">
          <Link href={useLocalizedRoute(routes.home)}>Zenith</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4 text-lg">
            <li>
              <Link
                href={useLocalizedRoute(routes.projects)}
                className="text-slate-100 hover:text-slate-400 transition-colors"
              >
                {t("project.projects")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex gap-3 items-center">
        {!user ? (
          <>
            <ActionIcon
              href={routes.userSignIn}
              text={t("user.signIn")}
              Icon={LuLogIn}
              variant="slate"
            />
            <ActionIcon
              href={routes.userRegister}
              text={t("user.signUp")}
              Icon={LuUserPlus}
              variant="blue"
            />
          </>
        ) : (
          <>
            <div
              className="hidden sm-flex items-center text-slate-100 
                  "
            >
              Hello, {user.displayName ?? user.email}
            </div>
            <ActionIcon
              href={routes.userProfile}
              text={t("user.profile")}
              Icon={LuCircleUser}
            />
            <ActionIcon
              href={routes.userSignOut}
              text={t("user.signOut")}
              Icon={LuLogOut}
              variant="blue"
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
