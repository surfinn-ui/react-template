import { IStateTreeNode, SnapshotIn } from 'mobx-state-tree';

interface IFormValidationProps {
  required?: string;
  pattern?: { value: string; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
}

type TFormField<T> = keyof SnapshotIn<T> & string;
type TFormValue<T> = SnapshotIn<T>[TFormField<T>];

export type TController<T> = (value: TFormValue<T>) => void;

export interface IFormController<T> {
  readonly errors: Record<TFormField<T>, string>;
  readonly values: Record<TFormField<T>, any>;
  register(
    name: TFormField<T>,
    validation?: IFormValidationProps
  ): TController<T>;
  reset(): void;
}

interface IForm<T> {
  [field: string]: {
    validations?: IFormValidationProps;
    value: SnapshotIn<T>[keyof SnapshotIn<T>];
  };
}

export const useForm = <T extends IStateTreeNode>(): IFormController<T> => {
  const _form: IForm<T> = {} as any;

  const setFieldValue = <K extends TFormField<T>, V extends TFormValue<T>[K]>(
    field: K,
    value: V
  ) => {
    _form[field].value =
      typeof value === 'string' ? value.replace(/\s/g, '') : value;
  };

  // prettier-ignore
  const validate = (field: TFormField<T> & string) => {
    
    if (!_form[field].validations) { return undefined; }

    const validations = _form[field].validations!;
    const value = _form[field].value;

    if (validations.required && (!value || ('' + value).replace(/\s/g, '').length === 0)) {
      return validations.required;
    } else if (validations.pattern && !new RegExp(validations.pattern.value).test(value)) {
      return validations.pattern.message;
    } else if (validations.min && value < validations.min.value) {
      return validations.min.message;
    } else if (validations.max && value > validations.max.value) {
      return validations.max.message;
    } else if (validations.minLength && value.length < validations.minLength.value) {
      return validations.minLength.message;
    } else if (validations.maxLength && value.length > validations.maxLength.value) {
      return validations.maxLength.message;
    }
    return undefined;
  }

  return {
    /**
     * Get validation errors for the form.
     */
    // prettier-ignore
    get errors() {
      return Object.keys(_form).reduce((errors, field) => {
        errors[field as TFormField<T>] = validate(field)
        return errors
      }, {} as { [field in TFormField<T>]: string });
    },

    /**
     * Get the form values.
     */
    get values() {
      return Object.keys(_form).reduce((values, field) => {
        values[field as TFormField<T>] = _form[field].value;
        return values;
      }, {} as SnapshotIn<T>);
    },

    /**
     * Register the form control.
     * @param field
     * @param validations
     * @returns
     */
    register<K extends TFormField<T>>(
      field: K,
      validations?: IFormValidationProps
    ): (value: TFormValue<T>[K]) => void {
      if (!_form[field]) {
        _form[field] = {
          validations: {},
          value: undefined,
        };
      }
      _form[field].validations = validations;

      return (value) => setFieldValue(field, value);
    },

    /**
     * Reset the form control.
     */
    reset() {
      Object.keys(_form).forEach((field: keyof SnapshotIn<T> & string) => {
        _form[field].value = '';
      });
    },
  };
};
