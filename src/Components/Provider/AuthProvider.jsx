import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";



export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user,setUser] = useState([]);
    const [loading,setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const createUser = async(email, password) => { 
        setLoading(true);  
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    const userLogin = async(email, password) => {
        setLoading(true);
        return await signInWithEmailAndPassword(auth, email, password)
    }

    const logInWithGoogle = async() => {
        setLoading(true);
        return await signInWithPopup(auth, provider)
    }

    const updateUserProfile = async(updatedData) => {
        setLoading(true);
        return await updateProfile(auth.currentUser, updatedData)
    }

    const logOut = async() => {
        setLoading(true);
        return await signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,currentUser => {
            setUser(currentUser);
            if(currentUser?.email){
                const user = {email: currentUser.email};
                axios.post('http://localhost:5000/jwt', user, {
                    withCredentials: true
                })
                .then(res=>{
                    setLoading(false)
                })
            }
            else{
                axios.post('http://localhost:5000/logout', {}, {withCredentials: true})
                .then(res=>{
                    setLoading(false)
                })
            }
        });
        return () => unsubscribe();
    }, []);

    // useEffect(()=>{
    //     const name = user?.displayName;
    //     const email = user?.email;
    //     const photo = user?.photoURL;
    //     const usersData = {name,email,photo};
    //     axios.post('http://localhost:5000/addUser',usersData)
    //     .then(res=>{console.log(res.data)})
    // },[user?.email])

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