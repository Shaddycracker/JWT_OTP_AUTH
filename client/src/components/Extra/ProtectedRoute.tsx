import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth,ChilderenType } from '../../contexts/AuthContext';
import { axiosInstance } from '@/lib/axiosInstance';
const ProtectedRoute:React.FC<ChilderenType> = ({ children }) => {
  
  const {user,logout} = useAuth();
  const navigate=useNavigate();
  useEffect(()=>{

   const Api=async ()=>{
  const token = localStorage.getItem('refreshToken');
 
  if (!token) {
     navigate('/auth/login')
  }
  if(token && !user){
    const user= await axiosInstance('api/users/verify',{token:token})

     
  }
   }

   Api();

  },[user])

  // if (!user) {
  //   return <Navigate to="/auth/login" replace />;
  // }

  return children;
};

export default ProtectedRoute;
