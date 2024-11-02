import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../config/env.ts';

export const Generatetokens =(userId: string)=>{
    const accessToken =jwt.sign({id:userId},JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken=jwt.sign({id:userId},JWT_SECRET,{ expiresIn: REFRESH_TOKEN_EXPIRES_IN});
    return { accessToken, refreshToken };

}