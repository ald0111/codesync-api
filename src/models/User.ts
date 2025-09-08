import { Schema, model, Document } from 'mongoose';
import { IUser } from '../types/User';

// Define a Mongoose Document interface that omits _id from IUser and extends Document
type IUserDoc = Omit<IUser, '_id'> & Document & { _id: any };

const userSchema = new Schema<IUserDoc>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student',
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUserDoc>('User', userSchema);

export default UserModel;
