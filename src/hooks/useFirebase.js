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
  const handleSignup = async (email, password, name) => {
    await createUserWithEmailAndPassword(auth, email, password);
    const newUser = { email, displayName: name };
    setCurrentUser(newUser);
    //save user to our database
    saveUser(email, name, "post");
    //send user to the firebase database
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //handle sign in
  const handleSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //handle google sign in
  const handleGoogleSignIn = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    //save user to our database
    setCurrentUser(result.user);
    saveUser(result.user.email, result.user.displayName, "put");
  };

  //handle github sign in
  const handleGithubSignIn = async () => {
    const result = await signInWithPopup(auth, githubProvider);
    //save user to our database
    setCurrentUser(result.user);
    saveUser(result.user.email, result.user.displayName, "put");
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
      url: "https://ug-o-on-travel-server.vercel.app/users",
      data: user,
    });
  };

  //admin check

  useEffect(() => {
    setLoading(true);
    if(currentUser){
      axios
      .get(
        `https://ug-o-on-travel-server.vercel.app/users/${currentUser?.email}`
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
    }
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