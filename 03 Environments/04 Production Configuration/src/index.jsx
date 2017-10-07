import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { StudentComponent } from './students';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
}

render(StudentComponent);

if (module.hot) {
  module.hot.accept('./students', () => {
    render(StudentComponent);
  })
}
