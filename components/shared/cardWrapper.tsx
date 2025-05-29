import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";

interface CardWrapperType {
  children: React.ReactNode;
  cardTitle: string;
  cardDescription: string;
  cardFooterLinkTitle?: string;
  cardFooterDescription?: string;
  cardFooterLink?: string;
  className?: string;
}

const CardWrapper = ({
  children,
  cardTitle,
  cardDescription,
  cardFooterLinkTitle = "Learn More", // Default value
  cardFooterDescription = "",
  cardFooterLink,
  className = "",
}: CardWrapperType) => {
  const { lang } = useParams();
  return (
    <Card className={`w-[400px] relative ${className}`}>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {cardFooterLink && (
        <CardFooter className="flex items-center justify-center gap-x-1">
          {cardFooterDescription && <span>{cardFooterDescription}</span>}
          <Link
            href={cardFooterLink}
            locale={lang as string}
            className="underline text-blue-500 hover:text-blue-700"
          >
            {cardFooterLinkTitle}
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default CardWrapper;
