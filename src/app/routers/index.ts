import { Router } from 'express';
import { loginRouters } from '../models/Auth/auth.router';
import { userRouter } from '../models/UsersRegistration/userRegistration.router';
import { employeeRouter } from '../models/Employee/employee.router';

const router = Router();

const moduleRouters = [
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/auth',
    route: loginRouters,
  },
  {
    path: '/employee',
    route: employeeRouter,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));
export default router;
