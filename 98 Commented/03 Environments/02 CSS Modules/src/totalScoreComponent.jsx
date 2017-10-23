import * as React from 'react';
import {getTotalScore} from './averageService';
import classNames from './totalScoreComponentStyles'; // When using CSS Modules, Webpack will create a bundle file for our CSS file that we can import to refer our styles/classNames

export class TotalScoreComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      scores: [10, 20, 30, 40, 50],
      totalScore: 0,
    };
  }

  componentDidMount() {
    this.setState({totalScore: getTotalScore(this.state.scores)});
  }

  render() {
    /* The classNames const variable holds all the styling rules defined in this component's CSS file. We can access the contents of this variable in React/JSX using {} as usual.
       classNames is an object that has a property defined for each one of the CSS classes defined in the CSS file. These properties' keys are strings with the same name as those
       CSS classes by default, so we would need to access them in this way in javascript: myClass = classNames['my-class'];. However, since we are setting the camelCase option of css-loader
       to true, we actually retrieve these classes using this notation instead: myClass = classNames.myClass; 
       */
    return (
      <div>
        <span className={classNames['result-background']}>
          Students total score: {this.state.totalScore}
        </span>
      </div>
    );
  }
}
