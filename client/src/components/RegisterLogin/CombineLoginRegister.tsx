import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axiosInstance.ts";

interface LoginTypeProp {
  LoginType: "login" | "register";
}
const CombineLoginRegister: React.FC<LoginTypeProp> = ({ LoginType }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();
  
 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
    navigate("/profile");
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
       try{
        const response = axiosInstance.post('/api/users/register')
            console.log(response);

       } 
       catch(err){
           alert("Error in Creating ");
       }
    
    navigate("/profile");
  };

  return (
    <div className="w-full h-full flex justify-center items-center min-h-screen">
      {
        <form
          onSubmit={(e) => {
            LoginType === "login" ? handleLogin(e) : handleRegister(e);
          }}
           className="border border-slate-900 flex flex-col max-w-96 p-3"
        >
          <h2>{LoginType === "login" ? "Login" : "Register"}</h2>
          {LoginType === "register" && (
            <>
              <label>UserName:</label>
              <input
                className="border"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />{" "}
            </>
          )}
          <label>Email:</label>
          <input
            className="border"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            className="border"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            {" "}
            {LoginType === "login" ? "Login" : "Register"}
          </button>
        </form>
      }
    </div>
  );
};

export default CombineLoginRegister;
