import { useState, useEffect } from "react";
import { auth } from "../../services/firebase";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut 
} from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // Force account selection to prevent auto-login loops in dev
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error("Firebase Login Error:", error);
      if (error?.code === 'auth/configuration-not-found') {
        throw new Error(
          'Firebase Auth configuration missing. Go to Firebase Console > Authentication > Sign-in method, enable Google provider, and add localhost:5175 (or your current host) to Authorized Domains.'
        );
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Firebase Logout Error:", error);
      throw error;
    }
  };

  return { user, loading, loginWithGoogle, logout };
}
