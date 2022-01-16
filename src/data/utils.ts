/* eslint-disable max-len */
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { days } from './weekDays';
import { Employee, Week } from '../App';

export const getRandomEmployees = (list: string[]): string[] => {
  let names: string[] = [];

  while (names.length < 5) {
    const randomNames = list[Math.floor(Math.random() * list.length)];
    names.push(randomNames);
    const checkDublicate = [...new Set(names)];
    names = checkDublicate;
  }

  return names;
};

export const getWeekList = (): string[] => {
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

export const generateWorkedHours = () => days.map((day) => ({ ...day, hours: Math.floor(Math.random() * (8 - 0 + 1) + 0) }));

export const setWorkedHours = ():Week[] => getWeekList().map((item) => ({
  period: item,
  timeSheet: generateWorkedHours(),
}));

export const generateEmployee = (name: string, weekList: string[]): Employee => ({ name, weekList: setWorkedHours(), id: uuidv4() });
