import { FilterQuery, Query } from 'mongoose';

class QueryBulider<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // 🔍 Search by multiple fields (case-insensitive)
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  // 🎯 Filtering with min/max salary support
  filter() {
    const queryObj = { ...this.query };

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
    const filterQuery = { ...queryObj } as FilterQuery<T>;

    // Add salary range filter if specified
    if (minSalary !== undefined || maxSalary !== undefined) {
      (filterQuery as any).salary = {};
      if (minSalary !== undefined) {
        (filterQuery as any).salary.$gte = minSalary;
      }
      if (maxSalary !== undefined) {
        (filterQuery as any).salary.$lte = maxSalary;
      }
    }

    this.modelQuery = this.modelQuery.find(filterQuery);
    return this;
  }

  // 🔽 Sorting (defaults to -createdAt)
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',').join(' ') || '-createdAt';

    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  // 📄 Pagination
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // 🧩 Field selection
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',').join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  // 📊 Count total documents for pagination info
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBulider;
