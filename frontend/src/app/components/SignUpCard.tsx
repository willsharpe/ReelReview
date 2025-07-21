"use client";
import {useState} from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";
interface SignInCardProps {
        onClose: () => void;
    }


function SignUpCard({onClose}:SignInCardProps){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      signUp(email,username, password);
    };
  
    const signUp = async (email:string, username: string, password: string) => {
          try {
              const res = await fetch('http://localhost:5000/api/auth/register',{
                  method:"POST",
                  headers : {
                      'Content-Type' : 'application/json',
                  },
                  body: JSON.stringify({email,username,password}),
              });
              const data = await res.json();
              if(!res.ok){
                  setMessage(data.message || "Something went wrong");
                  return;
              }
              setMessage(data.message);
              console.log("Account successfully created:", data);
          } catch(err) {
              console.error("Account creation failed:");
          }
      };
  
    return(
        <div className="fixed inset-0 bg-grey bg-opacity-50 flex justify-center items-center z-50">
              <form
                id="signup"
                className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm relative"
                onSubmit={handleSubmit}
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                >
                  <AiOutlineCloseCircle size={24} />
                </button>
        
                {/* Title */}
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Create Your Account
                </h2>



                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Enter the email you want associated with your account"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>



                {/* Username Field */}
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Create a Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
        
                {/* Password Field */}
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
        
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition-colors duration-200"
                >
                  Create Account
                </button>
                {message && (
                  <p>{message}</p>
                )}
              </form>
            </div>
    );
}

export default SignUpCard;