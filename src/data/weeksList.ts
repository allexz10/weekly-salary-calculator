/* eslint-disable max-len */
import moment from 'moment';

export const weekList: string[] = [];

const getWeeksList = ():void => {
  const now = moment('2022-01-13');
  const monday = now.clone().weekday(1);
  const sunday = now.clone().weekday(7);
  const currentWeek = `${monday.format('DD MMM YYYY')} - ${sunday.format('DD MMM YYYY')}`;
  const weekJan = `${moment(monday).clone().weekday(-6).format('DD MMM YYYY')} - ${moment(monday).clone().weekday(0).format('DD MMM YYYY')}`;
  const prevWeekJan = `${moment(monday).clone().weekday(-13).format('DD MMM YYYY')} - ${moment(monday).clone().weekday(-7).format('DD MMM YYYY')}`;
  const lastWeekDec = `${moment(monday).clone().weekday(-20).format('DD MMM YYYY')} - ${moment(monday).clone().weekday(-14).format('DD MMM YYYY')}`;
  const prevWeekDec = `${moment(monday).clone().weekday(-27).format('DD MMM YYYY')} - ${moment(monday).clone().weekday(-21).format('DD MMM YYYY')}`;

  weekList.push(currentWeek, weekJan, prevWeekJan, lastWeekDec, prevWeekDec);
};

getWeeksList();

export default weekList;
