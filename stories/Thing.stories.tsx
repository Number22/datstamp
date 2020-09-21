import React from 'react';
import { Thing, Props } from '../src';
import { subDays } from 'date-fns';

export default {
  title: 'Welcome',
};

const endDate = new Date();
const startDate = subDays(endDate, 365);


// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = (props?: Partial<Props>) => <Thing startDate={startDate} endDate={endDate} {...props} />;
