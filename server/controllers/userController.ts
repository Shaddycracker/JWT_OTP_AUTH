import { Request, Response } from 'express';
import * as userService from '../services/userService.ts';
import jwt,{JwtPayload} from 'jsonwebtoken';
import {JWT_SECRET,JWT_EXPIRES_IN} from '../config/env.ts';



export const register = async (req: Request, res: Response):Promise<void> => {
  try {
    const { email, username, password } = req.body;
    const user = await userService.registerUser(email, username, password);
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

export const login = async (req: Request, res: Response):Promise<void> => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    if (token) {
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ message: 'Refresh token required' });
  }else{

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    if (typeof decoded === 'object' && 'id' in decoded) {
      const accessToken = jwt.sign({ id: (decoded as JwtPayload).id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      res.json({ accessToken });
    } else {
       res.status(403).json({ message: 'Invalid refresh token format' });
    }
  } catch (error) {
     res.status(403).json({ message: 'Invalid refresh token' });
  }
  }
};
