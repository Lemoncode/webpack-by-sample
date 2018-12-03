import * as React from 'react';

export const Body: React.StatelessComponent = (props) => (
  <ul className="list-group list-group-flush">
    <li className="list-group-item">
      {props.children}
    </li>
  </ul>
);
