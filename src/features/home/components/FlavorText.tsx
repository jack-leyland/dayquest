import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ExpHistoryRecord } from '../types';
import { ThonburiBold } from '../../../common/components/StyledText';
import { selectExpHistory } from '../homeSlice';

const pickText = (scores: Array<ExpHistoryRecord>): string => {
  if (scores.length === 0) return "Let's get started!";
  let positiveCount = 0;
  let loop = scores.length <= 5 ? scores.length : 5;
  for (let i = 0; i < loop; i++) {
    if (scores[i].expChange > 0) positiveCount++;
  }
  if (positiveCount === 5) {
    return "You're on a roll!";
  } else if (positiveCount > 0 && positiveCount < 5) {
    return 'Looking good!';
  } else {
    return "Let's get back on track!";
  }
};

export default function FlavorText() {
  const [text, setText] = useState<string>('');

  const expHistory = useSelector(selectExpHistory);

  useEffect(() => {
    if (expHistory) {
      setText(pickText(expHistory));
    }
  }, [expHistory]);

  return (
    <ThonburiBold style={{ fontSize: 30, marginBottom: 20 }}>
      {text}
    </ThonburiBold>
  );
}
