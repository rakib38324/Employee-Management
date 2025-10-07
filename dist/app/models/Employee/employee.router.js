"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const employee_validation_1 = require("./employee.validation");
const employee_controller_1 = require("./employee.controller");
const router = express_1.default.Router();
router.post('/create-employee', 
// Auth(),
(0, validateRequest_1.default)(employee_validation_1.EmployeeValidations.createEmployeeValidationSchema), employee_controller_1.EmployeeController.CreatEmployee);
router.get('/', employee_controller_1.EmployeeController.getAllEmployee);
router.get('/:id', 
// Auth(), 
employee_controller_1.EmployeeController.getSingleEmployee);
router.patch('/update-employee/:id', 
// Auth(),
(0, validateRequest_1.default)(employee_validation_1.EmployeeValidations.updateEmployeeValidationSchema), employee_controller_1.EmployeeController.updateEmployee);
router.delete('/delete-employee/:id', 
//  Auth(),
employee_controller_1.EmployeeController.deleteEmployee);
exports.employeeRouter = router;
