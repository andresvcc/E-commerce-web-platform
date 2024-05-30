export const DTO_METADATA_KEY = Symbol('DtoMetadata');

const registeredDTOs = new Map<string, any>();

export function registerDto(name: string, dtoClass: any) {
  registeredDTOs.set(name, dtoClass);
}

export function Dto(options) {
  return function (target, propertyKey) {
    const existingMetadata = Reflect.getMetadata(DTO_METADATA_KEY, target) || [];
    existingMetadata.push({ propertyKey, options });
    Reflect.defineMetadata(DTO_METADATA_KEY, existingMetadata, target);
    registerDto(target.constructor.name, target.constructor);
  };
}

export class DataValidator {
  private static objToValidate: any;

  public static for(obj: any): typeof DataValidator {
    this.objToValidate = obj;
    return this;
  }

  public static withDto<T>(clazz: new () => T): boolean {
    if (!this.objToValidate) {
      throw new Error('No object set for Dto validation');
    }

    const metadata = Reflect.getMetadata(DTO_METADATA_KEY, clazz.prototype) as Array<{
      propertyKey: string | symbol;
      options: { type: string; required: boolean };
    }>;

    if (!metadata) {
      throw new Error('The object does not have DTO metadata');
    }

    return this.validateRecursive(this.objToValidate, metadata);
  }

  public static uuidIntegrity(): boolean {
    if (!this.objToValidate) {
      throw new Error('No object set for uuid validation');
    }

    if (typeof this.objToValidate !== 'string') {
      throw new Error('The object must be a string');
    }

    if (!this.objToValidate.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('The object must be a valid uuid');
    }

    return true;
  }

  public static emailIntegrity(): boolean {
    if (!this.objToValidate) {
      throw new Error('No object set for email validation');
    }

    if (typeof this.objToValidate !== 'string') {
      throw new Error('The object must be a string');
    }

    if (!this.objToValidate.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/)) {
      throw new Error('The object must be a valid email');
    }

    return true;
  }

  public static passwordIntegrity(): boolean {
    if (!this.objToValidate) {
      throw new Error('No object set for password validation');
    }

    if (typeof this.objToValidate !== 'string') {
      throw new Error('The object must be a string');
    }

    if (!this.objToValidate.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*?])(?=.{8,})/)) {
      throw new Error('The object must be a valid password');
    }

    return true;
  }

  public static stringIntegrity(): boolean {
    if (!this.objToValidate) {
      throw new Error('No object set for string validation');
    }

    if (typeof this.objToValidate !== 'string') {
      throw new Error('The object must be a string');
    }

    return true;
  }

  public static arrayIntegrity(types: string[]): boolean {
    if (!this.objToValidate) {
      throw new Error('No object set for array validation');
    }

    if (!Array.isArray(this.objToValidate)) {
      throw new Error('The object must be an array');
    }

    if (types.length > 0) {
      for (const obj of this.objToValidate) {
        if (!types.includes(typeof obj)) {
          throw new Error(`DATA_VALIDATION: The array must contain only ${types.join(', ')}`);
        }
      }
    }

    return true;
  }

  public static dateIntegrity(): boolean {
    if (!this.objToValidate) {
      throw new Error('No object set for date validation');
    }

    const dateObj = new Date(this.objToValidate);
    if (dateObj.toString() === 'Invalid Date') {
      throw new Error('The object must be a valid date');
    }

    return true;
  }

  public static rageDatesIntegrity(): boolean {
    if (!this.objToValidate || !this.objToValidate?.startDate || !this.objToValidate?.endDate) {
      throw new Error('No object set for date validation');
    }

    const startDate = new Date(this.objToValidate.startDate);
    if (startDate.toString() === 'Invalid Date') {
      throw new Error('The object must be a valid startDate');
    }

    const endDate = new Date(this.objToValidate.endDate);
    if (endDate.toString() === 'Invalid Date') {
      throw new Error('The object must be a valid endDate');
    }

    if (startDate > endDate) {
      throw new Error('The startDate must be before the endDate');
    }

    return startDate < endDate;
  }

  public static arrayContainsOnly(values: Array<string | number | boolean>): boolean {
    if (!this.objToValidate) {
      throw new Error('No object set for array validation');
    }

    if (!Array.isArray(this.objToValidate)) {
      throw new Error('The object must be an array');
    }

    if (values.length > 0) {
      for (const obj of this.objToValidate) {
        if (!values.includes(obj)) {
          throw new Error(`The array [${this.objToValidate}] must contain only ${values.join(', ')}`);
        }
      }
    }

    return true;
  }

  private static validateRecursive(
    obj: any,
    metadata: Array<{ propertyKey: string | symbol; options: { type: string; required: boolean } }>,
    parentKeys: string[] = [],
  ): boolean {
    let isValid = true;

    for (const { propertyKey, options } of metadata) {
      const value = obj[propertyKey as keyof typeof obj];
      const fullPath = [...parentKeys, String(propertyKey)].join('.');

      // If the value is undefined and it's not required, skip further validation for this property
      if (value === undefined && !options.required) {
        continue;
      }

      // Required validation
      if (options.required && (value === null || value === undefined)) {
        isValid = false;
        throw new Error(`ATTRIBUTE_MISSING_IN_RETRIEVED_DATA: Property ${fullPath} is required`);
      }

      if (options.type !== 'any' && typeof value !== options.type) {
        if (registeredDTOs.has(options.type)) {
          // If it's a registered DTO, validate recursively
          const nestedClazz = registeredDTOs.get(options.type);
          const nestedMetadata = Reflect.getMetadata(DTO_METADATA_KEY, nestedClazz.prototype);
          if (nestedMetadata) {
            isValid = isValid && this.validateRecursive(value, nestedMetadata, [...parentKeys, String(propertyKey)]);
            continue;
          }
        } else if (['string', 'number', 'boolean'].includes(options.type) || value === null) {
          isValid = false;
          throw new Error(`INCOMPATBLE_TYPE_IN_RETRIEVED_DATA: Property ${fullPath} must be of type ${options.type}`);
        }
      }
    }

    return isValid;
  }
}
