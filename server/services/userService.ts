import { User, IUser } from '../models/UsersData/User.model.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.ts';


export const registerUser = async (email: string, username: string, password: string): Promise<IUser> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    return await newUser.save();
  };

  export const loginUser = async (email: string, password: string): Promise<string | null> => {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      return token;
    }
    return null;
  };
  