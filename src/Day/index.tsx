import React, { FC } from 'react';
import { format, isSameMonth } from 'date-fns';
import cn from 'classnames';

import styles from './styles.css';

const cx = cn.bind(styles);

export type DayProps = {
  date: Date,
  startMonthDate: Date,
}

const Day: FC<DayProps> = ({ date, startMonthDate  }) => {
  const isDisabled = !isSameMonth(date, startMonthDate);

  return (
    <div
      className={cx({
        day: true,
        day_disabled: isDisabled,
      })}
    >
      {format(date, 'dd')}
    </div>
  );
};

export default Day;
