import jwt,{JwtPayload} from 'jsonwebtoken';
import {JWT_SECRET} from '../config/env.ts';
import {User} from '../models/UsersData/User.model.ts';

export const  getUserData = async (token:string) =>{
    
    try{
       const userInform= await jwt.verify(token,JWT_SECRET) as JwtPayload;
       const id=userInform.id; 
       const UserData = await User.find({_id:id});
       return UserData;

    }catch(err){
        console.log("err jwt",err);
        return null;
    }

}