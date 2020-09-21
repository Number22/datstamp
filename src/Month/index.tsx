import React, { FC } from 'react';
import {
  endOfWeek,
  endOfMonth,
  eachWeekOfInterval,
  eachDayOfInterval
} from 'date-fns';
import cn from 'classnames';

import styles from './styles.css';
import Day from '../Day';

const cx = cn.bind(styles);

export type MonthProps = {
  startMonthDate: Date,
}

const Month: FC<MonthProps> = ({ startMonthDate }) => {
  const endMonthDate = endOfMonth(startMonthDate);
  const weekDates = eachWeekOfInterval({ 
    start: startMonthDate, 
    end: endMonthDate
  });


  return <div className={cx('month')}>
    {
      weekDates.map(startWeekDate => {
        const endWeekDate = endOfWeek(startWeekDate);
        const weekDays = eachDayOfInterval({
          start: startWeekDate, 
          end: endWeekDate
        });
    
        return (
          <div>
            {weekDays.map(weekDay => <Day date={weekDay} startMonthDate={startMonthDate}/>)}
          </div>
        );
      })
    }
  </div>;
};

export default Month;
