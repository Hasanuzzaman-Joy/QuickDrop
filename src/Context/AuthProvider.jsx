import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import auth from '../Pages/Auth/Firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthProvider = ({ children }) => {

    const[user,setUser] = useState(null);
    const[loading, setLoading] = useState(true);

    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, userCredentials => {
            console.log(userCredentials)
            setUser(userCredentials);
            setLoading(false);
        })

        return () => {
            unsubscribe();
        }
    },[])

    const userInfo = {
        signUp,
        signIn,
        logOut,
        user,
        loading
    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;