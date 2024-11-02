import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload if needed for better typing

export interface CustomRequest extends Request {
  user?: string | JwtPayload; // Adjust based on the data you add to `user`
}