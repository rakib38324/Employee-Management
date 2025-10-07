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
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBulider {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    // 🔍 Search by multiple fields (case-insensitive)
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    // 🎯 Filtering with min/max salary support
    filter() {
        const queryObj = Object.assign({}, this.query);
        // Fields to exclude from basic filtering
        const excludeFields = [
            'maxSalary',
            'minSalary',
            'searchTerm',
            'limit',
            'page',
            'fields',
            'sort',
        ];
        // Extract special filters
        const minSalary = this.query.minSalary
            ? Number(this.query.minSalary)
            : undefined;
        const maxSalary = this.query.maxSalary
            ? Number(this.query.maxSalary)
            : undefined;
        // Remove excluded fields
        excludeFields.forEach((el) => delete queryObj[el]);
        // Create base filter query
        const filterQuery = Object.assign({}, queryObj);
        // Add salary range filter if specified
        if (minSalary !== undefined || maxSalary !== undefined) {
            filterQuery.salary = {};
            if (minSalary !== undefined) {
                filterQuery.salary.$gte = minSalary;
            }
            if (maxSalary !== undefined) {
                filterQuery.salary.$lte = maxSalary;
            }
        }
        this.modelQuery = this.modelQuery.find(filterQuery);
        return this;
    }
    // 🔽 Sorting (defaults to -createdAt)
    sort() {
        var _a, _b;
        const sort = ((_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(',').join(' ')) || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    // 📄 Pagination
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    // 🧩 Field selection
    fields() {
        var _a, _b;
        const fields = ((_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',').join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    // 📊 Count total documents for pagination info
    countTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalQueries = this.modelQuery.getFilter();
            const total = yield this.modelQuery.model.countDocuments(totalQueries);
            const page = Number(this.query.page) || 1;
            const limit = Number(this.query.limit) || 10;
            const totalPage = Math.ceil(total / limit);
            return {
                page,
                limit,
                total,
                totalPage,
            };
        });
    }
}
exports.default = QueryBulider;
