import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const GoogleSignInAPI = () => {
  try {
    let provider = new GoogleAuthProvider();
    let res = signInWithPopup(auth, provider);
    return res;
  } catch (err) {
    return err;
  }
};

export const Logout = () => {
  try {
    signOut(auth);
  } catch (err) {
    console.log(err);
  }
};
