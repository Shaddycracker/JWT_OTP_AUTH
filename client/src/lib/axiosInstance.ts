
import axios from "axios";
const token= localStorage.getItem('accessToken');
export const axiosInstance= axios.create({
      baseURL:'http://localhost:3000',
      headers:{
        "Content-Type":'application/json',
         ...(token && {"Authorization":`Bearer ${token}`}),
      },
})