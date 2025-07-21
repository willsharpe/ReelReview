"use client"
import {useState} from "react";
import toast  from "react-hot-toast";

function createAccount(){
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [password,SetPassword] = useState("");
    const [error,setError] = useState("");
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if(!name || !email || !password){
            toast.error("Please fill in all fields");
            setError("Please fill in all fields");
            return;
        }
        setError("");

        console.log(`Thank you ${name} you've successfully created your account with this email: ${email}`);
    }

    return(
        <form onSubmit={handleSubmit}
            
            >
            <div>
                <label htmlFor="name">
                    Email:
                </label> 
                <input 
                    type="text"
                    name="email"
                    value={email}
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="name">
                    Name:
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">
                    Password:
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => SetPassword(e.target.value)}
                />
           
            </div>
            <button type="submit">
                CREATE ACCOUNT
            </button>
 
        <div>
            {error}
        </div>
        </form>
    );
}


export default createAccount