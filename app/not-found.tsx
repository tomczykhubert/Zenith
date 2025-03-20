import Link from "next/link";
import { TbError404 } from "react-icons/tb";

export async function generateMetadata() {
  return {
    title: "Zenith",
    description: "Oops! Page not found",
  };
}

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="text-center">
        <div className="block mx-auto">
          <TbError404 className="inline-block text-red-500" size={100} />
        </div>
        <h1 className="text-3xl text-bold mb-8">Requested page not found</h1>
        <Link
          className="bg-lime-300 hover:bg-lime-500 px-6 py-3 rounded-md text-slate-700 cursor-pointer transition-colors"
          href="/"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
}
