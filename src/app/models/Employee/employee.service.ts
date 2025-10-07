/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/appError';
import { TEmployee } from './employee.interface';
import { Employee } from './employee.model';
import QueryBulider from '../../builder/QueryBuilder';

const createEmployeeIntoDB = async (
  payload: TEmployee,
) => {
  const isEmpolyee = await Employee.findOne({ email: payload?.email });
  if (isEmpolyee) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Employee with this email already exists',
    );
  }

  const employee = await Employee.create(payload);

  return employee;
};


const getAllEmployeeFromDB = async (query: Record<string, unknown>) => {
 
  const allEmployeeQuery = new QueryBulider(Employee.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

    const result = await allEmployeeQuery.modelQuery;
    const total = await allEmployeeQuery.countTotal();
    
  return { result, total };
};



const getEmployeeById = async (_id: string) => {
  const employee = await Employee.findById(_id).select('-createdAt -updatedAt');

  if (!Employee) {
    throw new AppError(httpStatus.FORBIDDEN, 'Employee not found');
  }

  return employee;
};

const updateEmpolyee = async (_id: string, data: Partial<TEmployee>) => {
  const employeeExists = await Employee.findById(_id);
  if (!employeeExists) {
    throw new AppError(httpStatus.FORBIDDEN, 'Employee not found');
  }

  const updatedTask = await Employee.findByIdAndUpdate(
    {
      _id,
    },

    data,
    { runValidators: true, new: true },
  );

  return updatedTask;
};


const deleteEmployee = async (_id: string) => {
  const employeeExists = await Employee.findById(_id);
  if (!employeeExists) {
    throw new AppError(httpStatus.FORBIDDEN, 'Employee not found');
  }

 
  const deletedTask = await Employee.findByIdAndDelete(_id);
  return deletedTask;
};

export const employeeServices = {
  createEmployeeIntoDB,
  getAllEmployeeFromDB,
  getEmployeeById,
  updateEmpolyee,
  deleteEmployee,
};
