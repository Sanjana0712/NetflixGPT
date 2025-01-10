import React, { useEffect } from 'react'
import { signOut } from 'firebase/auth';
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { removeGptMovieResults, toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector(store=>store.user);
  const showGPTSearch = useSelector(store=>store.gpt.showGptSearch);

  const handleSignOut=()=>{
    signOut(auth).then(()=>{
    }).catch((error)=>{

    });
  }

  const handleGptSearchClick = () => {
    if (!showGPTSearch) {
      // Clear previous results when entering GPT Search
      dispatch(removeGptMovieResults());
    }
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) =>{
    dispatch(changeLanguage(e.target.value));
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
        {user &&(
          <div className="flex items-center space-x-4 p-2">

            {showGPTSearch &&(<select className="p-2 m-2 bg-gray-800 text-white rounded" onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
              ))}
            </select>)}
 
            <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded'
            onClick={handleGptSearchClick}>
              {showGPTSearch ? "Home Page":"GPT Search"}
            </button>

          <img src={user.photoURL} alt="usericon" className="w-10 h-10 rounded object-cover" />
          <button onClick={handleSignOut} className="font-bold text-white cursor-pointer">Sign Out</button>
        </div>)}
    </div>
  );
}

export default Header