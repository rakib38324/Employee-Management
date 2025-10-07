import { Types } from 'mongoose';

export type TEmployee = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  status: 'active' | 'on-leave' | 'resigned';
};
