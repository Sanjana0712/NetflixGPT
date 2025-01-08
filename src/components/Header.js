import React, { useEffect } from 'react'
import { signOut } from 'firebase/auth';
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO } from '../utils/constants';


const Header = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector(store=>store.user);

  const handleSignOut=()=>{
    signOut(auth).then(()=>{
    }).catch((error)=>{

    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({uid: uid, email: email, displayName:displayName, photoURL:photoURL}));
          navigate("/browse");
        } else {
          // User is signed out
          dispatch(removeUser());
          navigate("/");
        }
      });
      //Unsubscribe when component unmounts
      return () => unsubscribe();
  },[])

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img 
        className="w-40"
        src={LOGO}
        alt="logo"/>

        {user &&(<div className="flex items-center space-x-4 p-2">
          <img src={user.photoURL} alt="usericon" className="w-10 h-10 rounded object-cover" />
          <button onClick={handleSignOut} className="font-bold text-white cursor-pointer">Sign Out</button>
        </div>)}
    </div>
  );
}

export default Header