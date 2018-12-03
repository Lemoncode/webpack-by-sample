import { FieldValidationResult } from 'lc-form-validation';

export interface LoginEntity {
  login: string;
  password: string;
}

export const createEmptyLoginEntity = (): LoginEntity => ({
  login: '',
  password: '',
});

export interface LoginFormErrors {
  login: FieldValidationResult;
  password: FieldValidationResult;
}

export const createEmptyLoginFormErrors = (): LoginFormErrors => ({
  login: new FieldValidationResult(),
  password: new FieldValidationResult(),
});
