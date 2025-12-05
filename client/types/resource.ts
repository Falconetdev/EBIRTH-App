import type { Timestamp } from "firebase/firestore";

export type ResourceItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  placeholderUrl?: string | null;
  placeholderStoragePath?: string | null;
  resourceUrl?: string | null;
  resourceStoragePath?: string | null;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
};
