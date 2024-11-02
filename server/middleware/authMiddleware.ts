import {Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {CustomRequest} from '../types/CustomRequest.ts'
import {JWT_SECRET} from '../config/env.ts';
export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
     res.status(401).json({ message: 'Access denied. No token provided.' });
     return;
  }

  try {
    const decoded = jwt.verify(token,JWT_SECRET);
    req.user=decoded;
    next();
    
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
