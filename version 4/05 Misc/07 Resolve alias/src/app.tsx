import * as React from 'react';

export const App: React.StatelessComponent = (props) => (
  <div className="container">
    {props.children}
  </div>
);
