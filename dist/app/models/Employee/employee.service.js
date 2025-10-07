"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const appError_1 = __importDefault(require("../../errors/appError"));
const employee_model_1 = require("./employee.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createEmployeeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmpolyee = yield employee_model_1.Employee.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (isEmpolyee) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Employee with this email already exists');
    }
    const employee = yield employee_model_1.Employee.create(payload);
    return employee;
});
const getAllEmployeeFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const allEmployeeQuery = new QueryBuilder_1.default(employee_model_1.Employee.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield allEmployeeQuery.modelQuery;
    const total = yield allEmployeeQuery.countTotal();
    return { result, total };
});
const getEmployeeById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield employee_model_1.Employee.findById(_id).select('-createdAt -updatedAt');
    if (!employee_model_1.Employee) {
        throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, 'Employee not found');
    }
    return employee;
});
const updateEmpolyee = (_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeExists = yield employee_model_1.Employee.findById(_id);
    if (!employeeExists) {
        throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, 'Employee not found');
    }
    const updatedTask = yield employee_model_1.Employee.findByIdAndUpdate({
        _id,
    }, data, { runValidators: true, new: true });
    return updatedTask;
});
const deleteEmployee = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeExists = yield employee_model_1.Employee.findById(_id);
    if (!employeeExists) {
        throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, 'Employee not found');
    }
    const deletedTask = yield employee_model_1.Employee.findByIdAndDelete(_id);
    return deletedTask;
});
exports.employeeServices = {
    createEmployeeIntoDB,
    getAllEmployeeFromDB,
    getEmployeeById,
    updateEmpolyee,
    deleteEmployee,
};
