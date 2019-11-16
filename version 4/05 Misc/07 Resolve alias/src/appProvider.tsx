import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppRouter } from './appRouter';

const AppProvider: React.StatelessComponent = (props) => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default hot(module)(AppProvider);
