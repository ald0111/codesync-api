import { Request, Response } from 'express';
import * as AuthService from '../services/authService';

// sample input: { name: "John Doe", email: "john@example.com", password: "password123" }
// sample output: { user: { id: "userId", name: "John Doe", email: "john@example.com" }, token: "jwtToken" }
export const register = async (req: Request, res: Response) => {
  try {
    const { user, token } = await AuthService.registerUser(req.body);
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};


// sample input: { email: "john@example.com", password: "password123" }
// sample output: { user: { id: "userId", name: "John Doe", email: "john@example.com" }, token: "jwtToken" }
export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await AuthService.loginUser(req.body.email, req.body.password);
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
