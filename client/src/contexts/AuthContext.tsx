import React, { createContext,useContext, useState, useEffect} from 'react';
import { axiosInstance } from '../lib/axiosInstance';
// import axios from 'axios';

interface UserType{
  _id: string;
  email: string;
  password: string;
  username: string;
  verified: boolean;
  userType: 'User' | 'Admin'; 
  __v: number;
}
interface AuthContextTypes{
    user: UserType|null;
    accessToken: string|null;
    login: (email:string,password:string)=> Promise<void>,
    logout: ()=>void,

}

export const AuthContext = createContext<AuthContextTypes | undefined>(undefined);
 
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export interface ChilderenType{

    children : React.ReactNode;
}


export const AuthProvider:React.FC<ChilderenType> = ({children})=> {

    const [user, setUser] = useState<UserType|null>(null);
    const [accessToken, setAccessToken] = useState<string |null >(null);
  
    // Function to log in and get the tokens
    const login = async (email:string, password:string) => {
      try {
        const { data } = await axiosInstance.post('/api/users/login', { email, password });
        setAccessToken(data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('token',data.token);
        setUser(data.user); // Set user data here
      } catch (error) {
        console.error("Login failed:", error);
      }
    };
  
    // Function to refresh the access token
    // const refreshToken = async () => {
    //   try {
    //     const { data } = await axiosInstance.post('/api/users/refresh-token', {
    //       refreshToken: localStorage.getItem('refreshToken')
    //     });
    //     setAccessToken(data.accessToken);
    //     localStorage.setItem('token',data.accessToken);
    //   } catch (error) {
    //     console.error("Token refresh failed:", error);
    //     logout();
    //   }
    // };
  
    // Function to log out
    const logout = () => {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('token');
    };


  
    // Automatically refresh the token when the component mounts
    // useEffect(() => {
    //   const refreshAccessToken = async () => {
    //     if (localStorage.getItem('refreshToken')) {
    //       await refreshToken();
    //       if(!user){
    //        const userData=await axiosInstance.post('/api/users/verify',{token:accessToken});

    //        console.log(userData);


    //       }
    //     }
    //   };
    //   refreshAccessToken();
    // }, []);
  
    // Axios interceptor to refresh the access token on 401 response
    // useEffect(() => {
    //   const interceptor = axios.interceptors.response.use(
    //     (response) => response,
    //     async (error) => {
    //       const originalRequest = error.config;
    //       if (error.response?.status === 401 && localStorage.getItem('refreshToken')) {
    //         await refreshToken();
    //         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
    //         return axios(originalRequest);
    //       }
    //       return Promise.reject(error);
    //     }
    //   );
    //   return () => axios.interceptors.response.eject(interceptor);
    // }, [accessToken]);

    return (
       <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
      </AuthContext.Provider>
    );
  
   
  };
  


