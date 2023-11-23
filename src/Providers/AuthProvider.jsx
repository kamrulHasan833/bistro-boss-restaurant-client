import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
const auth = getAuth(app);

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxiosPublic();
  //   get current user
  useEffect(() => {
    const unsubsctibe = onAuthStateChanged(auth, (currentUser) => {
      const { email, displayName, photoURl } = currentUser ? currentUser : {};
      setLoading(false);
      setUser(currentUser);
      if (currentUser) {
        axiosInstance
          .post("/bistro-boss-restaurant/v1/signin", {
            email,
            name: displayName,
            avater: photoURl,
          })
          .then(({ data }) => {
            const token = data?.token;
            if (token) {
              localStorage.setItem("token", `Bearer ${data?.token}`);
            }
          })
          .catch((err) => console.log(err));
      }
    });

    return () => {
      unsubsctibe();
    };
  }, []);
  // signup  with email and password
  const signup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update profile
  const profileUpdate = (name, image) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  // signup wiht google
  const signupWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // signin with email and password
  const signin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // signout
  const signout = () => {
    setLoading(true);
    return signOut(auth);
  };
  const authInfo = {
    user,
    loading,
    signup,
    signin,
    signout,
    signupWithGoogle,
    profileUpdate,
  };
  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
