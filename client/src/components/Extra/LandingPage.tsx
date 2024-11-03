import React from 'react'
import { useNavigate } from 'react-router-dom';
const LandingPage:React.FC = () => {
    const navigate=useNavigate();

  return (
    <div>
        <h2> Landing Page </h2>
       <button className='bg-red-900 text-white p-3 m-2' onClick={()=>{navigate('/auth/login')}}>Login</button> 
       <button className='bg-red-900 text-white p-3 m-2' onClick={()=>{navigate('/auth/register')}}>Register </button> 
    </div>
  )
}

export default LandingPage
