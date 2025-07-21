"use client";
import Link from "next/link";
import { Roboto_Mono } from "next/font/google";
import MovieIcon from "./MovieIcon";
import { SlLogout } from "react-icons/sl";
const roboto = Roboto_Mono({
  subsets: ["latin"],
});

interface NavBarProps {
  onSignInClick: () => void;
  onSignUpClick: () => void;
  loggedIn: boolean;
}



function NavBar({onSignInClick,onSignUpClick,loggedIn}:NavBarProps) {

  return (
    <>
    <Link href="/">
        <button className="justify-left gap-4 ">
          <MovieIcon/>
        </button>
    </Link>
    <header className={`flex justify-end gap-4 px-8 py-4 ${roboto.className}`}>
      
      {!loggedIn ? (
        
        <>
        <div onClick={onSignInClick} className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors duration-200 cursor-pointer">
            Sign In
        </div>
        

        <div onClick={onSignUpClick} className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors duration-200">
            Create Account
        </div>
        </>
      ):(<></>
      )}

      <Link href="/topRated">
        <button className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors duration-200">
            Top Rated
        </button>
      </Link>
      <Link href="/Upcoming">
        <button className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors duration-200">
          Upcoming
        </button>
      </Link>

      <select className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors duration-200">
     
        <option className="logOut option">
          
        </option>
      </select>
      
    </header>
    </>
  );
}

export default NavBar;
