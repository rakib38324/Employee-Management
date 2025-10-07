
import { Schema, model } from 'mongoose';
import { TEmployee } from './employee.interface';

const employeeSchema = new Schema<TEmployee>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    joinDate: { type: String, required: true },
    status: {
      type: String,
      enum: ['active', 'on-leave', 'resigned'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);

export const Employee = model<TEmployee>('Employee', employeeSchema);
