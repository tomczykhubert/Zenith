import Link from "next/link";
import { NavbarBaseProps } from "../navbar";
import UserActions from "./userActions";
import Image from "next/image";

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
      <div className="flex items-center gap-3">
        {user && (
          <>
            <p>Hello, {user.displayName || user.email}</p>
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
          </>
        )}
        <UserActions user={user} />
      </div>
    </div>
  );
};

export default NavbarDesktop;
