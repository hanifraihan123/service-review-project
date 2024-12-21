import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user,setUser] = useState([]);
    const [loading,setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const createUser = (email, password) => { 
        setLoading(true);  
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    const updateUserProfile = () => {
        setLoading(true);
        return updateProfile(auth.currentUser)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(currentUser => {
            console.log('I m observer', currentUser)
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
       user,
       loading,
       setLoading,
       createUser,
       userLogin,
       logInWithGoogle,
       updateUserProfile,
       logOut,
    }

    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;