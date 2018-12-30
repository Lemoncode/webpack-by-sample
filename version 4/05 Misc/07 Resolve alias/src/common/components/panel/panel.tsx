import * as React from 'react';
import { Body, Header } from './components';

interface Props {
  title: string;
}

export const Panel: React.StatelessComponent<Props> = (props) => (
  <div className="card">
    <Header title={props.title} />
    <Body>
      {props.children}
    </Body>
  </div>
);
