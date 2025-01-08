import React from 'react'
import { signOut } from 'firebase/auth';
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {

  const navigate=useNavigate();
  const user=useSelector(store=>store.user);

  const handleSignOut=()=>{
    signOut(auth).then(()=>{
      navigate("/");
    }).catch((error)=>{

    });

  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img 
        className="w-40"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-5e9f-7420-a5e4-86ff612f8e2a/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"/>

        {user &&(<div className="flex items-center space-x-4 p-2">
          <img src={user.photoURL} alt="usericon" className="w-10 h-10 rounded object-cover" />
          <button onClick={handleSignOut} className="font-bold text-white cursor-pointer">Sign Out</button>
        </div>)}
    </div>
  );
}

export default Header