import { PrismaBase, Specification } from "@/lib/prisma/specification";
import { ReactNode } from "react";

export interface ProviderProps<T extends PrismaBase> {
  children: ReactNode;
  specification?: Specification<T>;
}
