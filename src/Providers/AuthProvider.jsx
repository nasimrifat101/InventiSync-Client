/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import useAxiosNormal from "../Hooks/useAxiosNormal";
 
  
  export const AuthContext = createContext(null);
  const provider = new GoogleAuthProvider();
  
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  const axiosNormal = useAxiosNormal()
    const createAccount = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const updateUserProfile = (name, photoURL) => {
      setLoading(true);
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
          setUser(currentUser);
          if (currentUser) {
              // get token and store client
              const userInfo = { email: currentUser.email };
              axiosNormal.post('/jwt', userInfo)
                  .then(res => {
                      if (res.data.token) {
                          localStorage.setItem('access-token', res.data.token);
                          setLoading(false);
                      }
                  })
          }
          else {
              // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
              localStorage.removeItem('access-token');
              setLoading(false);
          }
          
      });
      return () => {
          return unsubscribe();
      }
  }, [axiosNormal])
  
    const loginUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    const googleLogin = () => {
      return signInWithPopup(auth, provider);
    };
  
    const authInfo = {
      createAccount,
      updateUserProfile,
      user,
      loading,
      loginUser,
      logOut,
      googleLogin,
    };
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  };
  
  export default AuthProvider;