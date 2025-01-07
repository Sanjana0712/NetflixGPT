import React from 'react'
import Header from './Header';

const Login = () => {

const [isSignIn, setIsSignIn] = React.useState(true);
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
        <form className="w-3/12 absolute p-12 bg-black m-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded">
            
            <h1 className="font-bold text-3xl py-4">
            {isSignIn ? "Sign In" : "Sign Up"}
            </h1>

            {!isSignIn &&(
                <input type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700 rounded"/>
            )}

            <input 
            type="text" 
            placeholder="Email Address" 
            className="p-4 my-4 w-full bg-gray-700 rounded"/>
            
            <input 
            type="password" 
            placeholder="Password" 
            className="p-4 my-4 w-full bg-gray-700 rounded"/>

            <button 
            className="p-4 my-4 bg-red-700 w-full rounded">
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