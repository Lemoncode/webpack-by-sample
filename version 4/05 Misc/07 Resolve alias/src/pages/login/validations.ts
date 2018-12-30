import { createFormValidation, ValidationConstraints, Validators } from 'lc-form-validation';

const validationConstraints: ValidationConstraints = {
  fields: {
    login: [
      { validator: Validators.required },
    ],
    password: [
      { validator: Validators.required },
    ],
  },
};

export const validations = createFormValidation(validationConstraints);
