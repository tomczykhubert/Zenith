import { useState } from "react";
import Link from "next/link";
import { LuMenu } from "react-icons/lu";
import { NavbarBaseProps } from "../navbar";
import UserActions from "./userActions";
import Image from "next/image";
import { useDictionary } from "@/providers/dictionaryProvider";
import ActionIcon from "@/components/shared/elements/actionIcon";

type NavbarMobileProps = NavbarBaseProps;

const NavbarMobile = ({ links, user }: NavbarMobileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useDictionary();

  return (
    <div className="flex md:hidden">
      <ActionIcon
        variant="lime"
        Icon={LuMenu}
        text=""
        onClick={() => setIsOpen(true)}
        className="md:hidden"
      />

      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 w-72 bg-slate-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="h-full flex flex-col p-6">
            {user && (
              <div className="flex items-center gap-3">
                <p>
                  {t("common.hello")}, {user.displayName || user.email}
                </p>
                {user.photoURL && (
                  <div>
                    <Image
                      width={50}
                      height={50}
                      src={user.photoURL}
                      alt={user.displayName || user.email}
                      className="rounded-full aspect-square object-cover"
                    />
                  </div>
                )}
              </div>
            )}
            <UserActions user={user} onClick={() => setIsOpen(false)} />
            <ul className="mt-5 space-y-6 flex-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-2xl font-semibold text-slate-100 hover:text-slate-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
