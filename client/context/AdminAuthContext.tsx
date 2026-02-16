import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut, type User } from "firebase/auth";

import { app } from "@/lib/firebase";

// Admin passphrase - store securely in production (environment variable)
const ADMIN_PASSPHRASE = import.meta.env.VITE_ADMIN_PASSPHRASE || "SecurePass2026";

export type AdminAuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, passphrase: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (name: string, email: string, password: string, passphrase: string) => {
    // Verify admin passphrase
    if (passphrase !== ADMIN_PASSPHRASE) {
      throw new Error("Invalid admin passphrase. Contact the web team for access.");
    }

    // Create the user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update the user's profile with their name
    await updateProfile(userCredential.user, {
      displayName: name
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
    }),
    [user, loading],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
