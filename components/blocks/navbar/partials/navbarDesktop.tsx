import Link from "next/link";
import { NavbarBaseProps } from "../navbar";
import UserActions from "./userActions";

type NavbarDesktopProps = NavbarBaseProps;

const NavbarDesktop = ({ links, user }: NavbarDesktopProps) => {
  return (
    <div className="hidden md:flex justify-between items-center w-full">
      <nav>
        <ul className="flex space-x-4 text-lg">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-slate-100 hover:text-slate-400 transition-colors"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <UserActions user={user} />
      </div>
    </div>
  );
};

export default NavbarDesktop;
