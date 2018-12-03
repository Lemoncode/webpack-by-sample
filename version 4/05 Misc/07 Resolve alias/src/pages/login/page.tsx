import * as React from 'react';
import { Panel } from '../../common/components/panel';
import { Form, FormProps } from './components';

export const LoginPage: React.StatelessComponent<FormProps> = (props) => (
  <Panel title="Please sign in">
    <Form
      {...props}
    />
  </Panel>
);
