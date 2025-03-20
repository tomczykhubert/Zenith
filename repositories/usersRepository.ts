import { User, UserRole } from "@/types/user";
import { BaseRepository } from "./baseRepository";
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export class UsersRepository extends BaseRepository<User> {
  constructor() {
    super("users");
  }

  protected override converter() {
    return {
      toFirestore: (user: User): DocumentData => {
        const { uid, email, role, displayName, photoURL } = user;
        return {
          uid,
          email,
          role,
          displayName,
          photoURL,
        };
      },
      fromFirestore: (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): User => {
        const data = snapshot.data(options);

        return {
          uid: snapshot.id,
          email: data.email || null,
          displayName: data.displayName || null,
          role: data.role || UserRole.DEVELOPER,
          photoURL: data.photoURL || null,
        };
      },
    };
  }
}
