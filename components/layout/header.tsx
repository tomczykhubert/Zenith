"use client";

import Link from "next/link";
import { routes } from "@/lib/routes/routes";
import { useLocalizedRoute } from "@/lib/routes/localizedRoute";
import Navbar from "./navbar/navbar";
import User from "@/types/user";
import LangSwitcher from "../shared/elements/langSwitcher";

export interface HeaderBaseProps {
  user: User | null;
}

const Header = () => {
  return (
    <header className="px-5 py-3 bg-gray-700 shadow-md">
      <div className="flex items-center gap-3 w-full justify-between">
        <LangSwitcher />
        <h1 className="text-3xl font-bold text-slate-100 hover:text-slate-400 transition-colors">
          <Link href={useLocalizedRoute(routes.home)}>Zenith</Link>
        </h1>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
