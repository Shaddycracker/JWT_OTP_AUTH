import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, ChilderenType } from "../../contexts/AuthContext";
import { axiosInstance } from "@/lib/axiosInstance";
const ProtectedRoute: React.FC<ChilderenType> = ({ children }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const Api = async () => {
      
      const token = localStorage.getItem("refreshToken");
      
      if (!token) {
        navigate("/auth/login");
      }
      try {
        
        if (token && !user) {
          const user = await axiosInstance.post("api/users/verify", {
            token: token,
          });

          
          if (user) {
             
            setUser(user.data.user[0]);
            
            
          } else {
            localStorage.removeItem("refreshToken");
            navigate("/auth/login");
            
          }
        }
      } catch (err) {
          console.log(err,"error <-");
      }
    };

    Api();
  }, [user]);

  return <>{children}</>;
};

export default ProtectedRoute;
