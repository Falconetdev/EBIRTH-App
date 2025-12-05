import type { Timestamp } from "firebase/firestore";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverUrl?: string | null;
  coverStoragePath?: string | null;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
};
