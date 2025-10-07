# 📝  Welcome to Employee Management System

This is an **Employee management system** built with **Express.js**, **TypeScript**, **MongoDB**, and **JWT authentication**.  
It enables users to securely manage their tasks, featuring authentication, email verification, and CRUD operations for employee management.

---
### Backend Live Link
```
https://server-pink-seven.vercel.app
```
### Frontend Live Link
```
https://employee-management-rouge-rho.vercel.app/
```
### Frontend GitHub Link
```
https://github.com/rakib38324/Employee-Management-Frontend
```

## 🚀 Features

- 🔐 **User Authentication**
  - Signup  
  - Login  
  - Forget Password & Reset Password  
  - Email Verification System  

- 📝 **Employee Management**
  - Create Employee.  
  - Update Employee Information.    
  - Delete Employee.
  - Get Employees with multiple queries.
 
---
### Api Endpoint
---
1. Auth:
     1. Registration: {{Local_URL}}/api/v1/user/user-registration
     2. Login: {{Local_URL}}/api/v1/auth/login
     3. Email Verification: {{Local_URL}}/api/v1/auth/email-verification
     4. Resend Email Verification Code: {{Local_URL}}/api/v1/auth/resend-email-verification
     5. Change Password: {{Local_URL}}/api/v1/auth/change-password
     6. Forget Password: {{Local_URL}}/api/v1/auth/forget-password
     7. Reset Password: {{Local_URL}}/api/v1/auth/reset-password

2. Users:
    1. Get all users: {{Local_URL}}/api/v1/user
    2. Get Me: {{Local_URL}}/api/v1/user/get-me
    3. Get Single User: {{Local_URL}}/api/v1/user/USERID
  
3. Employee:
    1. Get All Employees: {{Local_URL}}/api/v1/employee/?maxSalary=300
    2. Create Employee: {{Local_URL}}/api/v1/employee/create-employee
    3. Update Employee: {{Local_URL}}/api/v1/employee/update-employee/EMPLOYEEID
    4. Delete Employee: {{Local_URL}}/api/v1/employee/delete-employee/EMPLOYEEID

---
### Project Structure
```
backend/
├── src/
│   ├── app/
│   │   ├── config/         # Environment configuration
│   │   ├── errors/         # Global error handling
│   │   ├── interface/      # Global interface declarations
│   │   ├── middlewares/    # Middlewares (auth, error handling, etc.)
│   │   ├── models/         # Mongoose Schemas
│   │   │   ├── Auth/       # Auth Module
│   │   │   |   ├── controller/   # Auth controllers
│   │   │   |   ├── interface/    # Auth-related interfaces
│   │   │   |   ├── router/       # Auth routes
│   │   │   |   ├── service/      # Auth services (business logic)
│   │   │   |   └── validation/   # Auth input validation
│   │   │   ├── UserRegistration/       # User Registration Module
│   │   │   |   ├── controller/   # User Registration controllers
│   │   │   |   ├── interface/    # User Registration-related interfaces
│   │   │   |   ├── router/       # User Registration routes
│   │   │   |   ├── service/      # User Registration services (business logic)
│   │   │   |   └── validation/   # User Registration input validation
│   │   │   └── Employee/       # task Module
│   │   │       ├── controller/   # Employee controllers
│   │   │       ├── interface/    # Employee-related interfaces
│   │   │       ├── router/       # Employee routes
│   │   │       ├── service/      # Employee services (business logic)
│   │   │       └── validation/   # Employee input validation
│   │   ├── routers/        # API Routes entry point
│   │   └── utils/          # Utility functions (email, tokens, helpers)
│   │
│   ├── server.ts           # Server setup (Render entry point)
│   └── app.ts              # Main app initialization
│
├── dist/                   # Compiled JavaScript (after build)
├── package.json
└── tsconfig.json


```
## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rakib38324/Employee-Management.git
cd Employee-Management
```

### 2. Install resources
```bash
npm install
```

### 3. .env file structure
```
NODE_ENV=development
PORT=5000

DATABASE_URL=Your MongoDB database URL

BCRYPT_SALT_ROUND=12
JWT_ACCESS_SECRET=5ee2e2a94b5ad5d2510182ff9b1bb473440e8ef8abcf82a31a5c24dd616237f4b433c312050f6d989f22f95ee6e9db32ba0a7796caca455f87984bd6f5977a87
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_SECRET=b60d48feca045bae433b3d6cdbd40709b4c96f8a4c0f8dcf6a4c47c04d936251b6939b644ab39937006cdc9ca250bf880d35830f710e8944a225c428896be660
JWT_REFRESH_EXPIRES_IN=1d
EMAIL_VERIFICATION_UI_LINK=frontend_live_link/email-verification
RESET_PASSWORD_UI_LINK=frontend_live_link/reset-password
CLIENT_UI_LINK=frontend_live_link

```

 ### 4. Start in development
```bash
npm run start:dev
```

 ### 6. Start in production
```bash
npm run build
npm start
```


