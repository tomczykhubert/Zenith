import { Order, Specification } from "@/prisma/base";
import { ReactNode } from "react";

export interface ProviderProps<T> {
  children: ReactNode;
  specification?: Specification<T>;
  order?: Order<T>;
}
