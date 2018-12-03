import * as React from 'react';
import { FormProps } from './formProps';
import { Input, Button } from '../../../common/components/form';

export const Form: React.StatelessComponent<FormProps> = (props) => (
  <form role="form">
    <fieldset>
      <Input
        name="login"
        label="Login"
        onChange={props.updateField}
        placeholder="E-mail"
        value={props.loginEntity.login}
        error={props.loginFormErrors.login.errorMessage}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        onChange={props.updateField}
        placeholder="password"
        value={props.loginEntity.password}
        error={props.loginFormErrors.password.errorMessage}
      />
      <Button
        onClick={props.doLogin}
        label="Login"
      />
    </fieldset>
  </form>
);
