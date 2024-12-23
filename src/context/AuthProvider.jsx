import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase.config";

const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    
    const signInWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth, GoogleAuthProvider)
    }

    const signOutUser = () =>{
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false)
        })

        return () =>{
            unsubscribe();
        }
    },[])
    const authInfo = {
        user,
        loading,
        createUser,
        singInUser,
        signInWithGoogle,
        signOutUser

    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;