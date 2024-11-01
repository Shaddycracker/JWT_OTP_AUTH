// @types/express/index.d.ts
import express from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string | jwt.JwtPayload; // Adjust based on the type of your decoded token
    }
  }
}
