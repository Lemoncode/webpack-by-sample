import * as React from 'react';
import {getAvg} from './averageService';
import classNames from './averageComponentStyles';

export class AverageComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      scores: [90, 75, 60, 99, 94, 30],
      average: 0,
    };
  }

  componentDidMount() {
    this.setState({average: getAvg(this.state.scores)});
  }

  render() {
    return (
      <div>
        <span className={classNames.resultBackground}>
          Students average: {this.state.average}
        </span>

        <span className={`jumbotron ${classNames.resultBackground}`}>
          Jumbotron students average: {this.state.average}
        </span>
      </div>
    );
  }
}
