
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User'; // Your Mongoose model
import { IUser } from '../types/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function registerUser(userData: IUser) {
  const { name, email, password } = userData;

  if (!name || !email || !password) {
    throw new Error('Name, email, and password are required.');
  }

  const existing = await UserModel.findOne({ email });
  if (existing) {
    throw new Error('Email already registered.');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await UserModel.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  return { user, token };
}

export async function loginUser(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials.');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid credentials.');
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  return { user, token };
}
