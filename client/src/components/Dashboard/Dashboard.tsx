import React from 'react'
import { useAuth } from "../../contexts/AuthContext";
const Dashboard:React.FC= () => {
    const {logout,user}=useAuth();
    const handleLogout=()=>{
     logout();
    }
  return (
    <div>
           <h2>Email ID: {user?.email} </h2>

           <button className='bg-red-900 text-white p-3 m-2' onClick={handleLogout}> Logout </button>
            Dashboard Here 

      
    </div>
  )
}

export default Dashboard
