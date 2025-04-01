import { useState } from "react";
import Link from "next/link";
import { LuMenu } from "react-icons/lu";
import { NavbarBaseProps } from "../navbar";
import ActionIcon from "@/components/ui/actionIcon";
import UserActions from "./userActions";

type NavbarMobileProps = NavbarBaseProps;

const NavbarMobile = ({ links, user }: NavbarMobileProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
