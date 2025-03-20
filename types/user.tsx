export enum UserRole {
  ADMIN = "ADMIN",
  DEVOPS = "DEVOPS",
  DEVELOPER = "DEVELOPER",
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  photoURL?: string | null;
}

export const mapUsersToSelect = (users: User[]) => {
  return users.map((user) => ({
    label: user.displayName || user.email || user.uid,
    value: user.uid,
  }));
};
