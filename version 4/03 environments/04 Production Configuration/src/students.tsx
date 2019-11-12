import React from 'react';
import { hot } from 'react-hot-loader/root';
import { AverageComponent } from './averageComponent';
import { TotalScoreComponent } from './totalScoreComponent';

$('body').css('background-color', 'lightSkyBlue');

const App: React.FunctionComponent = () => {
  return (
    <div>
      <h1>Hello from React DOM</h1>
      <AverageComponent />
      <TotalScoreComponent />
    </div>
  );
};

export default hot(App);
