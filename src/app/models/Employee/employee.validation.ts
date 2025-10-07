import { z } from 'zod';

const createEmployeeValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required.' })
      .min(1, 'Name must not be empty.'),
    email: z
      .string({ required_error: 'Email is required.' })
      .email('Invalid email format.'),
    department: z
      .string({ required_error: 'Department is required.' })
      .min(1, 'Department must not be empty.'),
    position: z
      .string({ required_error: 'Position is required.' })
      .min(1, 'Position must not be empty.'),
    salary: z
      .number({ required_error: 'Salary is required.' })
      .min(0, 'Salary must be a positive number.'),
    joinDate: z
      .string({ required_error: 'Join date is required.' })
      .min(1, 'Join Date must not be eplty.'),
    status: z
      .enum(['active', 'on-leave', 'resigned'])
      .optional()
      .default('active'),
  }),
});

const updateEmployeeValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required.' })
      .min(1, 'Name must not be empty.')
      .optional(),
    email: z
      .string({ required_error: 'Email is required.' })
      .email('Invalid email format.')
      .optional(),
    department: z
      .string({ required_error: 'Department is required.' })
      .min(1, 'Department must not be empty.')
      .optional(),
    position: z
      .string({ required_error: 'Position is required.' })
      .min(1, 'Position must not be empty.')
      .optional(),
    salary: z
      .number({ required_error: 'Salary is required.' })
      .min(0, 'Salary must be a positive number.')
      .optional(),
    joinDate: z
      .string({ required_error: 'Join date is required.' })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format. Must be a valid ISO date string.',
      })
      .optional(),
    status: z
      .enum(['active', 'on-leave', 'resigned'])
      .optional(),
  }),
});

export const EmployeeValidations = {
  createEmployeeValidationSchema,
  updateEmployeeValidationSchema,
};
