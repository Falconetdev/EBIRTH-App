import type { Timestamp } from "firebase/firestore";

export type Event = {
  id: string;
  title: string;
  slug: string;
  description: string;
  schedule: string;  // e.g., "Every Saturday"
  time: string;      // e.g., "8:00 PM"
  location: string;  // e.g., "YouTube Live", "eBirth HQ"
  coverUrl?: string | null;
  coverStoragePath?: string | null;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
  featured?: boolean; // Show on homepage
};
