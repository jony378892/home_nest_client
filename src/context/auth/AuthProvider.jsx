import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { auth } from "../../firebase/firebase.init";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [customError, setCustomError] = useState();

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signUpUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(true);
      } else {
        setLoading(true);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    signInUser,
    signUpUser,
    signInWithGoogle,
    updateUser,
    logoutUser,
    customError,
    setCustomError,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}
