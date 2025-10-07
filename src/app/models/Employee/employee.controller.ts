import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import commonRes from '../../utils/commonResponse';
import { employeeServices } from './employee.service';

const CreatEmployee = catchAsync(async (req, res) => {
  const result = await employeeServices.createEmployeeIntoDB(req.body);

  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee created successfully!',
    data: result,
  });
});


const getAllEmployee = catchAsync(async (req, res) => {
  const result = await employeeServices.getAllEmployeeFromDB(req.query);

  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee retrieved successfully!',
    data: result,
  });
});


const getSingleEmployee = catchAsync(async (req, res) => {
  const taskId = req.params.id;
  const result = await employeeServices.getEmployeeById(taskId);

  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee retrieved successfully!',
    data: result,
  });
});



const updateEmployee = catchAsync(async (req, res) => {
  const taskId = req.params.id;
  const payload = req.body;
  const result = await employeeServices.updateEmpolyee(taskId, payload,);

  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee updated successfully!',
    data: result,
  });
});


const deleteEmployee = catchAsync(async (req, res) => {
  const _id = req.params.id;
  const result = await employeeServices.deleteEmployee(_id);

  commonRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee deleted successfully!',
    data: result,
  });
});

export const EmployeeController = {
  CreatEmployee,
  getAllEmployee,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
