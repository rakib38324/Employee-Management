import express from 'express';
import Auth from '../../middlewares/Auth';
import ValidateRequest from '../../middlewares/validateRequest';
import { EmployeeValidations } from './employee.validation';
import { EmployeeController } from './employee.controller';
const router = express.Router();

router.post(
  '/create-employee',
  // Auth(),
  ValidateRequest(EmployeeValidations.createEmployeeValidationSchema),
  EmployeeController.CreatEmployee,
);

router.get('/', EmployeeController.getAllEmployee);
router.get('/:id', 
  // Auth(), 
EmployeeController.getSingleEmployee);



router.patch(
  '/update-employee/:id',
  // Auth(),
  ValidateRequest(EmployeeValidations.updateEmployeeValidationSchema),
  EmployeeController.updateEmployee,
);

router.delete('/delete-employee/:id',
  //  Auth(),
    EmployeeController.deleteEmployee);

export const employeeRouter = router;
