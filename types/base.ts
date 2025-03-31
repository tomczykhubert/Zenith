import ID from "./id";

export interface Base {
  id: ID;
  createdAt: Date;
  updatedAt: Date | null;
}
