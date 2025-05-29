"use client";

import { routes } from "@/lib/routes/routes";
import { useDictionary } from "@/providers/dictionaryProvider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Separator } from "@/components/ui/separator";

interface BreadcrumbItem {
  href?: string;
  label: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
  children?: React.ReactNode;
}

export default function PageBreadcrumb({
  items,
  children,
}: PageBreadcrumbProps) {
  const { t } = useDictionary();

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <SidebarTrigger />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={routes.home}>
                  {t("common.home")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {items.map((item, index) => [
                <BreadcrumbSeparator key={`sep-${index}`} />,
                <BreadcrumbItem key={`item-${index}`}>
                  {item.href ? (
                    <BreadcrumbLink href={item.href}>
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>,
              ])}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {children}
      </div>
      <Separator className="my-4" />
    </>
  );
}
