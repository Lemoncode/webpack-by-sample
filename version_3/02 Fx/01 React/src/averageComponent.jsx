import * as React from 'react';
import {getAvg} from './averageService';

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
        <span>Students average: {this.state.average}</span>
      </div>
    );
  }
}
