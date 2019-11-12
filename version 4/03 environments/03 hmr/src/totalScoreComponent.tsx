import React from 'react';
import { getTotalScore } from './averageService';
const classes = require('./totalScoreComponentStyles.scss');

export const TotalScoreComponent: React.FunctionComponent = () => {
  const [totalScore, setTotalScore] = React.useState<number>(0);

  React.useEffect(() => {
    const scores: number[] = [10, 20, 30, 40, 50];
    setTotalScore(getTotalScore(scores));
  }, []);

  return (
    <div>
      <span className={classes.resultBackground}>
        Students total score: {totalScore}
      </span>
    </div>
  );
};
