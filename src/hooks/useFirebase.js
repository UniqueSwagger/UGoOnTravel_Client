import axios from "axios";
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
  updateProfile,
} from "firebase/auth";
import { useState, useEffect } from "react";
import initializeAuthentication from "../firebase/firebase.init.js";
initializeAuthentication();
const useFirebase = () => {
  const auth = getAuth();
  //all state
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  //all provider
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // handle sign up
  const handleSignup = (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      const newUser = { email, displayName: name };
      setCurrentUser(newUser);
      //save user to our database
      saveUser(email, name, "post");
      //send user to the firebase database
      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          //updated user to the firebase database
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };

  //handle sign in
  const handleSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //handle google sign in
  const handleGoogleSignIn = () => {
    return signInWithPopup(auth, googleProvider).then((result) => {
      //save user to our database
      setCurrentUser(result.user);
      saveUser(result.user.email, result.user.displayName, "put");
    });
  };

  //handle github sign in
  const handleGithubSignIn = () => {
    return signInWithPopup(auth, githubProvider).then((result) => {
      //save user to our database
      setCurrentUser(result.user);
      saveUser(result.user.email, result.user.displayName, "put");
    });
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

  //save user to the database
  const saveUser = (email, displayName, httpMethod) => {
    const user = { email, displayName };
    axios({
      method: httpMethod,
      url: "https://grisly-werewolf-76792.herokuapp.com/users",
      data: user,
    });
  };

  //admin check

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://grisly-werewolf-76792.herokuapp.com/users/${currentUser?.email}`
      )
      .then((res) => {
        setAdmin(res.data.admin);
        if (admin) {
          setLoading(false);
        }
        setInterval(() => {
          if (!admin) {
            setLoading(false);
          }
        }, 5000);
      });
  }, [currentUser?.email, admin]);

  return {
    handleSignup,
    currentUser,
    loading,
    admin,
    setCurrentUser,
    handleGoogleSignIn,
    handleGithubSignIn,
    handleLogout,
    handleSignIn,
    resetPassword,
  };
};

export default useFirebase;
