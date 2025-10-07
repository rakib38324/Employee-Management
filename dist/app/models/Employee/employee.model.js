"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const mongoose_1 = require("mongoose");
const employeeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    joinDate: { type: String, required: true },
    status: {
        type: String,
        enum: ['active', 'on-leave', 'resigned'],
        default: 'active',
    },
}, {
    timestamps: true,
});
exports.Employee = (0, mongoose_1.model)('Employee', employeeSchema);
