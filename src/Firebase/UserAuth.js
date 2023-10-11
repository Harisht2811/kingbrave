import { createContext, useEffect, useState, useContext } from 'react';
import {
    // createUserWithEmailAndPassword,
    // signInWithEmailAndPassword,
    signInWithPhoneNumber,
    // signOut,
    RecaptchaVerifier,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from './FirebaseConfig';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState("");

    // function signUp(email, password, role) {
    //     console.log(email, password)
    //     return createUserWithEmailAndPassword(auth, email, password, role);
    // }
    // function logIn(phonenumber) {
    //     console.log("Phone:", phonenumber);
    //     return signInWithPhoneNumber(auth, phonenumber);
    // }
    function setRecaptcha(number){
        console.log(number)
        const recaptchaverifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
        recaptchaverifier.render()
        return signInWithPhoneNumber(auth,"+"+number,recaptchaverifier)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, []);
    return <userAuthContext.Provider value={{ user, setRecaptcha }}>{!loading && children}</userAuthContext.Provider>
}
export function useUserAuth() {

    return useContext(userAuthContext);
}