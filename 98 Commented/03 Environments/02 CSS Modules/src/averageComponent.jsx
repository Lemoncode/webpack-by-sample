import * as React from 'react';
import {getAvg} from './averageService';
import classNames from './averageComponentStyles'; // When using CSS Modules, Webpack will create a bundle file for our CSS file that we can import to refer our styles/classNames

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
    /* The classNames const variable holds all the styling rules defined in this component's CSS file. We can access the contents of this variable in React/JSX using {} as usual.
       classNames is an object that has a property defined for each one of the CSS classes defined in the CSS file. These properties' keys are strings with the same name as those
       CSS classes by default, so we would need to access them in this way in javascript: myClass = classNames['my-class'];. However, since we are setting the camelCase option of css-loader
       to true, we actually retrieve these classes using this notation instead: myClass = classNames.myClass; 
       
       In the case of the jumbotron, since it is actually a global class, we want to use a string literal for it, so we use string interpolation to assign both classes to our span element:
       jumbotron (a literal) and classNames.resultBackground (a variable)
       */
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
