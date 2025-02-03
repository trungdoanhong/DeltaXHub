'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  Auth,
} from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc, Firestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
  updateUserRoles: (userId: string, roles: string[]) => Promise<void>;
  getUserRoles: (userId: string) => Promise<string[]>;
  isAdmin: () => Promise<boolean>;
  updateUserCredit: (userId: string, amount: number) => Promise<void>;
  getUserCredit: (userId: string) => Promise<number>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [db, setDb] = useState<Firestore | null>(null);

  // Initialize Firebase only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      const auth = getAuth(app);
      const db = getFirestore(app);
      
      setAuth(auth);
      setDb(db);

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user);
          // Get or create user document in Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (!userDoc.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
              email: user.email,
              name: user.displayName,
              photoURL: user.photoURL,
              createdAt: new Date().toISOString(),
            });
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

  // Add admin role to trungdoanhong@gmail.com during signup/signin
  const ensureAdminUser = async (user: User) => {
    if (!db) return;
    if (user.email === 'trungdoanhong@gmail.com') {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        roles: ['Admin']
      }, { merge: true });
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    if (!auth || !db) return;
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, 'users', user.uid), {
        email,
        name,
        roles: ['User'],
        credits: 100, // Default credits for new users
        createdAt: new Date().toISOString(),
      });
      await ensureAdminUser(user);
    } catch (error) {
      console.error('Error in sign up:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!auth || !db) return;
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await ensureAdminUser(user);
    } catch (error) {
      console.error('Error in sign in:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    if (!auth || !db) return;
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          roles: ['User'],
          credits: 100, // Default credits for new users
          createdAt: new Date().toISOString(),
        });
      }
      await ensureAdminUser(user);
    } catch (error) {
      console.error('Error in Google sign in:', error);
      throw error;
    }
  };

  const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
    if (!user || !db) return;
    try {
      await updateProfile(user, data);
      await setDoc(doc(db, 'users', user.uid), {
        ...data,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error in logout:', error);
      throw error;
    }
  };

  const updateUserRoles = async (userId: string, roles: string[]) => {
    if (!db || !user) return;
    try {
      const currentUserDoc = await getDoc(doc(db, 'users', user.uid));
      const currentUserRoles = currentUserDoc.data()?.roles || [];
      
      if (!currentUserRoles.includes('Admin')) {
        throw new Error('Only administrators can update user roles');
      }

      await setDoc(doc(db, 'users', userId), {
        roles,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (error) {
      console.error('Error updating user roles:', error);
      throw error;
    }
  };

  const getUserRoles = async (userId: string) => {
    if (!db) return [];
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      return userDoc.data()?.roles || [];
    } catch (error) {
      console.error('Error getting user roles:', error);
      return [];
    }
  };

  const isAdmin = async () => {
    if (!user || !db) return false;
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const roles = userDoc.data()?.roles || [];
      return roles.includes('Admin');
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  const updateUserCredit = async (userId: string, amount: number) => {
    if (!db || !user) return;
    try {
      const currentUserDoc = await getDoc(doc(db, 'users', user.uid));
      const currentUserRoles = currentUserDoc.data()?.roles || [];
      
      if (!currentUserRoles.includes('Admin')) {
        throw new Error('Only administrators can update user credits');
      }

      const userDoc = await getDoc(doc(db, 'users', userId));
      const currentCredits = userDoc.data()?.credits || 0;
      const newCredits = currentCredits + amount;

      if (newCredits < 0) {
        throw new Error('Credit balance cannot be negative');
      }

      await setDoc(doc(db, 'users', userId), {
        credits: newCredits,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      // Add credit transaction history
      const transactionRef = collection(db, 'users', userId, 'creditHistory');
      await addDoc(transactionRef, {
        amount,
        type: amount > 0 ? 'credit' : 'debit',
        adminId: user.uid,
        adminEmail: user.email,
        timestamp: new Date().toISOString(),
        balance: newCredits
      });

    } catch (error) {
      console.error('Error updating user credits:', error);
      throw error;
    }
  };

  const getUserCredit = async (userId: string) => {
    if (!db) return 0;
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      return userDoc.data()?.credits || 0;
    } catch (error) {
      console.error('Error getting user credits:', error);
      return 0;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signUp, 
      signIn, 
      signInWithGoogle,
      logout,
      updateUserProfile,
      updateUserRoles,
      getUserRoles,
      isAdmin,
      updateUserCredit,
      getUserCredit
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 