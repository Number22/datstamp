import React, { FC, HTMLAttributes, ReactChild } from 'react';
import Calendar from './Calendar';
import './styles.css'
import 'simplebar/dist/simplebar.min.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild;
  startDate: Date,
  endDate: Date,
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const Thing: FC<Props> = ({ startDate, endDate }) => {
  return <Calendar startDate={startDate} endDate={endDate} />;
};
