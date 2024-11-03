import React from 'react'
import { Navigate } from 'react-router-dom';
import { ChilderenType } from '@/contexts/AuthContext'
const UnprotectedRoute:React.FC<ChilderenType> = ({children}) => {
      
    const token = localStorage.getItem('refreshToken');

    if(token){
    return <Navigate to="/profile" replace />
    }
    

    return children;
  
  
}

export default UnprotectedRoute
