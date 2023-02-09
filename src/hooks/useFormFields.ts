import { useMemo, useState } from 'react';

interface IFormFieldOptions {
  required?: boolean;
  pattern?: {
    value: RegExp;
    message: string;
  };
  min?: {
    value: number;
    message: string;
  };
  max?: {
    value: number;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
}

export function useFormFields<T>(
  initialState: T,
  options: { [key in keyof T & string]?: IFormFieldOptions } = {}
): [
  T, // fields
  (field: keyof T & string, value: any) => void, // onChange
  () => void, // reset
  { [key in keyof T & string]?: string } // errors
] {
  const [fields, setValue] = useState(initialState);

  function validate(field: string, value: any) {
    if (!options) {
      return undefined;
    }

    if (!options[field]) {
      return undefined;
    }

    // required
    if (options[field].required && (!value || ('' + value).trim() === '')) {
      return 'Required';
    }

    // pattern
    if (
      options[field].pattern &&
      !options[field].pattern.value.test(value as string)
    ) {
      return options[field].pattern.message;
    }

    // number check
    if (typeof value === 'number' || value instanceof Number) {
      // min
      if (options[field].min && value < options[field].min.value) {
        return options[field].min.message;
      }
      // max
      if (options[field].max && value > options[field].max.value) {
        return options[field].max.message;
      }
    }

    // string check
    if (typeof value === 'string' || value instanceof String) {
      // minLength
      if (
        options[field].minLength &&
        (value as string).length < options[field].minLength.value
      ) {
        return options[field].minLength.message;
      }
      // maxLength
      if (
        options[field].maxLength &&
        (value as string).length > options[field].maxLength.value
      ) {
        return options[field].maxLength.message;
      }
    }
  }

  const errors = useMemo(() => {
    const errors = {};
    Object.keys(fields).forEach((field) => {
      errors[field] = validate(field, fields[field]);
    });
    return errors;
  }, [fields]);

  const onChange = (field: keyof T & string, value: any): void => {
    setValue((fields) => ({
      ...fields,
      [field]: value,
    }));
  };

  const reset = () => {
    setValue(initialState);
  };

  return [fields, onChange, reset, errors];
}
