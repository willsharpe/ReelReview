"use client";

import { Roboto_Mono } from "next/font/google";
import { motion, useMotionValue } from "framer-motion";
import NavBar from "./components/NavBar";
import { useState,useEffect } from "react"
import { Rubik_Glitch } from "next/font/google";
import './styles/globals.css';
import MovieGrid from "./components/MovieGrid";
import SignInCard from "./components/SignInCard";
import SignUpCard from "./components/SignUpCard";
import MovieIcon from "./components/MovieIcon";
import AccountPage from "./accountPage/page";

const rubik = Rubik_Glitch({
  subsets:['latin'],
  weight:'400',
  variable:'--font-glitch'
});

const roboto = Roboto_Mono({
  subsets:['latin'],
  
})

export default function Home(){
  const [signInPopUpVisible, setSignInPopupVisible] = useState(false);
  const [signUpPopUpVisible, setSignUpPopUpVisible] = useState(false);
  const [loggedIn,setLoggedIn] = useState(false);

  /*useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setLoggedIn(true);
    }
  }, []);*/
 

  const handleSignUpClick = () => {
    setSignUpPopUpVisible(true);
  };
  const handleSignUpClose = () => {
    setSignUpPopUpVisible(false);
  };

  const handleSignInClick = () => {
    setSignInPopupVisible(true);
  };

  const handleClosePopup = () => {
    setSignInPopupVisible(false);
  };

  return(
    <>
    <div className={`relative h-[900px]  bg-center bg-no-repeat bg-cover ${signInPopUpVisible ? 'blur-sm' : ''} ${signUpPopUpVisible ? 'blur-sm': ''}`}
    style={{ backgroundImage: `url('/306069-3840x2160-desktop-4k-interstellar-wallpaper.jpg')`, backgroundSize:'auto 700px'}}
    >

      <div className="relative z-20">
        <NavBar onSignInClick={handleSignInClick} onSignUpClick={handleSignUpClick} loggedIn={loggedIn}/>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        viewport={{ once: true }}
        className={`text-center py-150 text-4xl font-bold my-10 ${roboto.className}`}
      >
        Letterboxd Clone
      </motion.div>
     

    </div>

    <div style={{marginBottom: '10px', paddingTop:'50px'}}>
      <motion.div
        initial= {{opacity:0,scale:0.95 }}
        whileInView={{ opacity: 1, scale:1}}
        transition={{ duration: 1.0}}
        viewport={{ once:true}}
        className="container mx-auto px-4">
          <MovieGrid isPopupVisible={signInPopUpVisible} />
      </motion.div>
    
    </div>
    
    {signUpPopUpVisible && <SignUpCard onClose={handleSignUpClose} />}
    {signInPopUpVisible && <SignInCard  onClose={handleClosePopup} setLoggedIn={setLoggedIn}/>}

    </>
  );
}