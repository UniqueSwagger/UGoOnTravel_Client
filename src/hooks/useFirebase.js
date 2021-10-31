import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState, useEffect } from "react";
import initializeAuthentication from "../firebase/firebase.init.js";
initializeAuthentication();
const useFirebase = () => {
  const auth = getAuth();
  //all state
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  //all provider
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // handle sign up
  const handleSignup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //handle sign in
  const handleSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //handle google sign in
  const handleGoogleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //handle github sign in
  const handleGithubSignIn = () => {
    return signInWithPopup(auth, githubProvider);
  };

  //handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser({});
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // observing the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setCurrentUser(user) : setCurrentUser({});
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  return {
    handleSignup,
    currentUser,
    loading,
    setCurrentUser,
    handleGoogleSignIn,
    handleGithubSignIn,
    handleLogout,
    handleSignIn,
    resetPassword,
  };
};

export default useFirebase;
