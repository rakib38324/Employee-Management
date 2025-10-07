"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeValidations = void 0;
const zod_1 = require("zod");
const createEmployeeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'Name is required.' })
            .min(1, 'Name must not be empty.'),
        email: zod_1.z
            .string({ required_error: 'Email is required.' })
            .email('Invalid email format.'),
        department: zod_1.z
            .string({ required_error: 'Department is required.' })
            .min(1, 'Department must not be empty.'),
        position: zod_1.z
            .string({ required_error: 'Position is required.' })
            .min(1, 'Position must not be empty.'),
        salary: zod_1.z
            .number({ required_error: 'Salary is required.' })
            .min(0, 'Salary must be a positive number.'),
        joinDate: zod_1.z
            .string({ required_error: 'Join date is required.' })
            .min(1, 'Join Date must not be eplty.'),
        status: zod_1.z
            .enum(['active', 'on-leave', 'resigned'])
            .optional()
            .default('active'),
    }),
});
const updateEmployeeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'Name is required.' })
            .min(1, 'Name must not be empty.')
            .optional(),
        email: zod_1.z
            .string({ required_error: 'Email is required.' })
            .email('Invalid email format.')
            .optional(),
        department: zod_1.z
            .string({ required_error: 'Department is required.' })
            .min(1, 'Department must not be empty.')
            .optional(),
        position: zod_1.z
            .string({ required_error: 'Position is required.' })
            .min(1, 'Position must not be empty.')
            .optional(),
        salary: zod_1.z
            .number({ required_error: 'Salary is required.' })
            .min(0, 'Salary must be a positive number.')
            .optional(),
        joinDate: zod_1.z
            .string({ required_error: 'Join date is required.' })
            .refine((date) => !isNaN(Date.parse(date)), {
            message: 'Invalid date format. Must be a valid ISO date string.',
        })
            .optional(),
        status: zod_1.z
            .enum(['active', 'on-leave', 'resigned'])
            .optional(),
    }),
});
exports.EmployeeValidations = {
    createEmployeeValidationSchema,
    updateEmployeeValidationSchema,
};
