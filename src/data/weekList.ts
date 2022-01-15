/* eslint-disable max-len */
import moment from 'moment';

const getWeekList = (): string[] => {
  const now = moment();
  const monday = now.clone().weekday(1);
  const sunday = now.clone().weekday(7);
  const weekList: string[] = [
    `${monday.format('DD MMM YYYY')} - ${sunday.format('DD MMM YYYY')}`,
    `${moment(monday).clone().weekday(-6).format('DD MMM YYYY')} - ${moment(monday).clone().weekday(0).format('DD MMM YYYY')}`,
    `${moment(monday).clone().weekday(-13).format('DD MMM YYYY')} - ${moment(monday).clone().weekday(-7).format('DD MMM YYYY')}`,
    `${moment(monday).clone().weekday(-20).format('DD MMM YYYY')} - ${moment(monday).clone().weekday(-14).format('DD MMM YYYY')}`,
    `${moment(monday).clone().weekday(-27).format('DD MMM YYYY')} - ${moment(monday).clone().weekday(-21).format('DD MMM YYYY')}`,
  ];
  return weekList;
};

export default getWeekList;
