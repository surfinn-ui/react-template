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
  options: { [key in keyof T & string]?: IFormFieldOptions } = {},
): [
  T, // fields
  (field: keyof T & string, value: any) => void, // onChange
  () => void, // reset
  { [key in keyof T & string]?: string }, // errors
] {
  const [fields, setValue] = useState(initialState);

  function validate(field: string, value: any) {
    if (!options) {
      return undefined;
    }

    if (!options[field as keyof T & string]) {
      return undefined;
    }

    // required
    if (
      options[field as keyof T & string]?.required &&
      (!value || ('' + value).trim() === '')
    ) {
      return 'Required';
    }

    // pattern
    if (
      options[field as keyof T & string]?.pattern &&
      !options[field as keyof T & string]?.pattern?.value.test(value as string)
    ) {
      return options[field as keyof T & string]?.pattern?.message;
    }

    // number check
    if (typeof value === 'number' || value instanceof Number) {
      const _value = value as number;
      // min
      if (
        options[field as keyof T & string]?.min &&
        _value < options[field as keyof T & string]?.min?.value!
      ) {
        return options[field as keyof T & string]?.min?.message;
      }
      // max
      if (
        options[field as keyof T & string]?.max &&
        _value > options[field as keyof T & string]?.max?.value!
      ) {
        return options[field as keyof T & string]?.max?.message;
      }
    }

    // string check
    if (typeof value === 'string' || value instanceof String) {
      // minLength
      if (
        options[field as keyof T & string]?.minLength &&
        (value as string).length <
          options[field as keyof T & string]?.minLength?.value!
      ) {
        return options[field as keyof T & string]?.minLength?.message;
      }
      // maxLength
      if (
        options[field as keyof T & string]?.maxLength &&
        (value as string).length >
          options[field as keyof T & string]?.maxLength?.value!
      ) {
        return options[field as keyof T & string]?.maxLength?.message;
      }
    }
  }

  const errors = useMemo(() => {
    const errors: { [key in keyof T & string]?: string } = {};
    Object.keys(fields!).forEach((field) => {
      if (field) {
        // @ts-ignore
        errors[field] = validate(field, fields[field as keyof T & string]);
      }
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
