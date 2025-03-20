import { FaArrowLeft } from "react-icons/fa";
import ActionIcon from "../ui/actionIcon";
interface TitleProps {
  title: string;
  subtitle?: string;
  backUrl?: string;
}

export default function Title({ title, subtitle, backUrl }: TitleProps) {
  return (
    <div className="flex items-center mb-3">
      {backUrl && (
        <ActionIcon
          href={backUrl}
          Icon={FaArrowLeft}
          text="Back"
          className="me-3"
        />
      )}
      <div>
        <h1 className="text-2xl leading-[1.25] ">{title}</h1>
        <h2 className="mt-2 text-md text-slate-300 leading-[1.25]">
          {subtitle}
        </h2>
      </div>
    </div>
  );
}
