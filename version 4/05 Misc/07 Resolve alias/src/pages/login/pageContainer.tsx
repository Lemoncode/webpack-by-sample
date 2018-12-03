import * as React from 'react';
import { history } from '../../history';
import {
  LoginEntity,
  createEmptyLoginEntity,
  LoginFormErrors,
  createEmptyLoginFormErrors,
} from './viewModel';
import { validations } from './validations';
import { LoginPage } from './page';
import { routes } from '../../common/constants/routes';
import { login } from '../../rest-api/api/login';
import { mapLoginEntityVMToModel } from './mappers';
import { FieldValidationResult } from 'lc-form-validation';

interface State {
  loginEntity: LoginEntity;
  loginFormErrors: LoginFormErrors;
}

export class LoginPageContainer extends React.PureComponent<{}, State> {
  state = {
    loginEntity: createEmptyLoginEntity(),
    loginFormErrors: createEmptyLoginFormErrors(),
  };

  updateField = (fieldName: string, value: any) => {
    validations
      .validateField(this.state.loginEntity, fieldName, value)
      .then((fieldValidationResult) => {
        this.setState({
          loginEntity: {
            ...this.state.loginEntity,
            [fieldName]: value,
          },
          loginFormErrors: {
            ...this.state.loginFormErrors,
            [fieldName]: fieldValidationResult,
          },
        });
      });
  }

  doLogin = () => {
    validations
      .validateForm(this.state.loginEntity)
      .then((formValidationResult) => {
        formValidationResult.succeeded
          ? this.loginRequest()
          : this.displayErrors(formValidationResult.fieldErrors);
      });
  }

  loginRequest = () => {
    const loginEntity = mapLoginEntityVMToModel(this.state.loginEntity);
    login(loginEntity)
      .then(() => {
        history.push(routes.members);
      })
      .catch(alert);
  }

  displayErrors = (fieldErrors: { [key: string]: FieldValidationResult }) => {
    this.setState({
      ...this.state,
      loginFormErrors: {
        ...this.state.loginFormErrors,
        ...fieldErrors,
      },
    });
  }

  render() {
    return (
      <LoginPage
        loginEntity={this.state.loginEntity}
        loginFormErrors={this.state.loginFormErrors}
        updateField={this.updateField}
        doLogin={this.doLogin}
      />
    );
  }
}
