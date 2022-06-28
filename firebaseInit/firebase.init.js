import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";

// initialize the config file over here
export const initializeAuthentication = () => {
  initializeApp(firebaseConfig);
};
