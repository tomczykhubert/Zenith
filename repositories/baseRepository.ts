import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WhereFilterOp,
  where,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ParamValue } from "next/dist/server/request/params";

export interface QuerySpecification {
  field: string;
  operator: WhereFilterOp;
  value:
    | string
    | number
    | boolean
    | null
    | Date
    | Array<string | number>
    | ParamValue;
}

export class BaseRepository<T extends { uid: string }> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  protected converter(): FirestoreDataConverter<T> {
    return {
      toFirestore: (data: T): DocumentData => ({ ...data }),
      fromFirestore: (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
      ): T => {
        const data = snapshot.data(options);
        return { ...data, uid: snapshot.id } as T;
      },
    };
  }

  async get(): Promise<T[]> {
    const querySnapshot = await getDocs(
      collection(db, this.collectionName).withConverter(this.converter())
    );
    return querySnapshot.docs.map((doc) => doc.data() as T);
  }

  async getById(uid: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, uid).withConverter(
      this.converter()
    );
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : null;
  }

  async create(item: T): Promise<void> {
    const docRef = doc(db, this.collectionName, item.uid).withConverter(
      this.converter()
    );
    await setDoc(docRef, item);
  }

  async update(partialState: Partial<T>): Promise<void> {
    if (!partialState.uid) throw new Error("UID is required for update");
    const docRef = doc(db, this.collectionName, partialState.uid);
    await updateDoc(docRef, partialState as DocumentData);
  }

  async delete(uid: string): Promise<void> {
    const docRef = doc(db, this.collectionName, uid);
    await deleteDoc(docRef);
  }

  async getBySpecification(specifications: QuerySpecification[]): Promise<T[]> {
    const collectionRef = collection(db, this.collectionName).withConverter(
      this.converter()
    );

    const constraints = specifications.map((spec) =>
      where(spec.field, spec.operator, spec.value)
    );

    const q = query(collectionRef, ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as T);
  }
}
