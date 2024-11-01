import { Request, Response } from 'express';
import * as userService from '../services/userService.ts';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const user = await userService.registerUser(email, username, password);
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

export const login = async (req: Request, res: Response) => {
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
