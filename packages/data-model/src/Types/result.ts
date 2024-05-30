export class Result<T> {
  result?: T;
  errors?: string[];
  totalPages?: number;
  page?: number;
  limit?: number;

  private constructor(result?: T, errors?: string[], page?: number, totalPages?: number, limits?: number) {
    this.result = result;
    this.errors = errors && errors.length > 0 ? errors : undefined;
    this.page = page;
    this.totalPages = totalPages;
    this.limit = limits;
  }

  /**
   * Creates a successful result.
   */
  static ok<U>(value: U, page?: number, totalPages?: number, limits?: number): Result<U> {
    return new Result(value, undefined, page, totalPages, limits);
  }

  /**
   * Creates a failed result.
   */
  static fail(errors: string[]): Result<any> {
    return new Result(undefined, errors);
  }

  /**
   * Creates a Result from a value or an error.
   */
  static from<U>(params: {
    value?: U;
    errors?: string[];
    page?: number;
    totalPages?: number;
    limits?: number;
  }): Result<U> {
    if (params.value && (!params.errors || !params.errors.length)) {
      return Result.ok(params.value, params.totalPages);
    } else if (params.errors && params.errors.length) {
      return Result.fail(params.errors);
    } else {
      throw new Error('Invalid arguments: You must provide either a value or errors.');
    }
  }
}
