import Link from "next/link";
import { cn } from "@/lib/utils";

import { useLocalizedRoute } from "@/lib/routes/localizedRoute";
import { Tooltip } from "react-tooltip";

const variantStyles = {
  lime: "bg-lime-300 hover:bg-lime-500",
  green: "bg-green-300 hover:bg-green-500",
  blue: "bg-blue-300 hover:bg-blue-500",
  danger: "bg-red-500 hover:bg-red-700",
  slate: "bg-slate-300 hover:bg-slate-500",
  gray: "bg-gray-600 hover:bg-slate-700",
  outline: "bg-transparent border border-blue-500 hover:bg-blue-500",
  transparent:
    "bg-transparent hover:bg-transparent text-slate-500 hover:text-slate-800 px-0 py-0",
};

interface ActionIconProps {
  Icon?: React.ElementType;
  className?: string;
  variant?: keyof typeof variantStyles;
  iconSize?: number;
  text: string;
  href?: string;
  onClick?: () => void;
}

export default function ActionIcon({
  Icon,
  href,
  onClick,
  variant = "lime",
  className,
  iconSize = 18,
  text,
}: ActionIconProps) {
  const localizedHref = useLocalizedRoute(href || "/");
  const generateId = (prefix: string, key: string) => {
    return `${prefix}-${key.replace(/[^a-zA-Z0-9]/g, "")}`;
  };
  const tooltipId = generateId("tooltip", text);

  const commonProps = {
    className: cn(
      `px-5 py-3 rounded-md text-slate-700 transition-colors cursor-pointer ${variantStyles[variant]}`,
      className
    ),
    ...(Icon
      ? { "data-tooltip-id": tooltipId, "data-tooltip-content": text }
      : {}),
  };

  const content = Icon ? (
    <>
      <Icon size={iconSize} />
      <Tooltip id={tooltipId} />
    </>
  ) : (
    text
  );

  if (href) {
    return (
      <Link href={localizedHref} {...commonProps}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} {...commonProps}>
      {content}
    </button>
  );
}
