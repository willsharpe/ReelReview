"use client";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {useState} from "react";
interface SignInCardProps {
  onClose: () => void;
  setLoggedIn:(value:boolean) => void;
}


function SignInCard({ onClose,setLoggedIn }: SignInCardProps) {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  const login = async (username: string, password: string) => {
      try {
          const res = await fetch('http://localhost:5000/api/auth/login',{
              method:"POST",
              headers : {
                  'Content-Type' : 'application/json',
              },
              body: JSON.stringify({username,password}),
          });
          const data = await res.json();
          if(!res.ok){
              setMessage(data.message || "Something went wrong");
              return;
          }
          setLoggedIn(true);
          onClose();
          const token = data.userInfo.token;
          localStorage.setItem("jwt",token);
          setMessage(data.message);
      } catch(err) {
          console.error("Login failed:");
      }
  };


  return (
    <div className="fixed inset-0 bg-grey bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        id="signin"
        className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm relative"
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
          Sign In
        </h2>

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
            placeholder="Enter your username"
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
          type="button"
          className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition-colors duration-200"
          onClick={handleSubmit}
        >
          Sign In
        </button>

       {message && (
        <p className="text-center text-sm mt-2 text-red-400">{message}</p>
      )}
      </form>
    </div>
  );
}

export default SignInCard;
