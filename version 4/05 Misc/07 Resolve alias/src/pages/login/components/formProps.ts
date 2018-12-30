import { LoginEntity, LoginFormErrors } from '@/pages/login/viewModel';

export interface FormProps {
  loginEntity: LoginEntity;
  loginFormErrors: LoginFormErrors;
  updateField: (field: string, value: any) => void;
  doLogin: () => void;
}
