import React, { FC } from 'react';
// import { eachMonthOfInterval } from 'date-fns';
// import cn from 'classnames';


// import styles from './styles.css';
// import Month from '../Month';
import Scroll from '../Scroll';

// const cx = cn.bind(styles);

export type CalendarProps = {
  startDate: Date,
  endDate: Date,
}

const Calendar: FC<CalendarProps> = ({ 
  // startDate,
  // endDate,
}) => {
  // const months = eachMonthOfInterval({
  //   start: startDate,
  //   end: endDate
  // });

  // const GenerateItem = (index: number) => {
  //   return <Month startMonthDate={months[index]} />;
  // }

  return (
    <Scroll />
  );
};

export default Calendar;
