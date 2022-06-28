import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { initializeAuthentication } from "../firebaseInit/firebase.init";
import { useRouter } from "next/router";

// calling the initilizing func over here
initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // auth and providers here
  const auth = getAuth();

  // create user with email and password here
  const registerUser = (email, password, name) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateUserProfile(name);
        setUser(result.user);
        setError("");
        router.replace("/");
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  // sign in existing user here
  const signIn = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        setError("");
        router.replace("/");
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  // getting the current user here
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setError("");
      } else {
        setUser({});
      }
      setLoading(false);
    });
  }, [auth]);

  // update user profile || name here
  const updateUserProfile = (name) => {
    setLoading(true);
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {})
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  // log out user here
  const logoutUser = () => {
    signOut(auth)
      .then(() => console.log("successfullll"))
      .catch((error) => setError(error.message));
  };

  // returning here all the necessary things
  return {
    user,
    error,
    signIn,
    loading,
    setUser,
    setError,
    logoutUser,
    registerUser,
  };
};

export default useFirebase;
