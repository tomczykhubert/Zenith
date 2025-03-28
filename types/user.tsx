import { UserRole } from "@prisma/client";
import { BaseDto } from "./base";

export default interface User extends BaseDto {
  email: string | null;
  displayName: string | null;
  role: UserRole;
  photoURL: string | null;
}

export const mapUsersToSelect = (users: User[]) => {
  return users.map((user) => ({
    label: user.displayName || user.email || user.id,
    value: user.id,
  }));
};
