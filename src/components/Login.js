import React from 'react'
import Header from './Header';
import { useState, useRef } from 'react';
import { validateData } from '../utils/validate';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser} from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';


const Login = () => {

const [isSignIn, setIsSignIn] = useState(true);
const [error, setError] = useState(null);
const dispatch = useDispatch();

const email=useRef(null);
const password=useRef(null);
const name=useRef(null);

const handleButtonClick = () => {
    //Validate the user
    const message = validateData(email.current.value, password.current.value, isSignIn ? "" : name.current.value);
    setError(message);

    //If the message is string(not null), return from here
    if(message) return; 

    //Proceed if user is valid
    if(!isSignIn){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            
            updateProfile(user, {
                displayName: name.current.value, photoURL:USER_AVATAR
              }).then(() => {
                // Profile updated!
                const {uid, email, displayName, photoURL} = auth.currentUser;
                dispatch(addUser({uid: uid, email: email, displayName:displayName, photoURL:photoURL}));
                // navigate("/browse");
              }).catch((error) => {
                setError(error.message);
              });

            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode+"-"+errorMessage);
        });
    }
    else{
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            // navigate("/browse");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode+"-"+errorMessage);
        });
    }
}

const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
}

  return (
    <div>
        <Header/>
        <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/2f5a878d-bbce-451b-836a-398227a34fbf/web/US-en-20241230-TRIFECTA-perspective_2af53bf2-40ee-4020-a4fd-9be233afd9f1_large.jpg"
        alt="logo"/>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black m-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded">
            
            <h1 className="font-bold text-3xl py-4">
            {isSignIn ? "Sign In" : "Sign Up"}
            </h1>

            {!isSignIn &&(
                <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700 rounded"/>
            )}

            <input 
            ref={email}
            type="text" 
            placeholder="Email Address" 
            className="p-4 my-4 w-full bg-gray-700 rounded"/>
            
            <input 
            ref={password}
            type="password" 
            placeholder="Password" 
            className="p-4 my-4 w-full bg-gray-700 rounded"/>

            <p className="text-red-600">{error}</p>

            <button 
            className="p-4 my-4 bg-red-700 w-full rounded" onClick={handleButtonClick}>
            {isSignIn ? "Sign In" : "Sign Up"}
            </button>

            <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignIn ? (
                <>
                New to Netflix?{" "}
                <span className="font-semibold text-white hover:underline">Sign up now</span>
                </>
                ) : (
                <>
                Already signed up?{" "}
                <span className="font-semibold text-white hover:underline">Sign In now</span>
                </>
                )}
            </p>


            {/* <p className="py-4 cursor-pointer" 
            onClick={toggleSignInForm}>
            {isSignIn ? "New to Netflix? Sign up now": "Already signed up? Sign In now"}
            </p> */}
        </form>
    </div>
  )
}

export default Login;