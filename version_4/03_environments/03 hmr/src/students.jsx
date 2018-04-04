import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader'
import { AverageComponent } from './averageComponent';
import { TotalScoreComponent } from './totalScoreComponent';


const myRoot = () =>
  <div>
    <h1>Hello from React DOM</h1>
    <AverageComponent />
    <TotalScoreComponent />
  </div>

const App = hot(module)(myRoot);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
