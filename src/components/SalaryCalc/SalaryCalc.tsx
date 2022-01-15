/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import weekDays from '../../data/weekDays';
import './SalaryCalc.scss';

type Props = {
  update: boolean;
};

type WeeksSheet = {
  day: string;
  hours: number;
  weekend: boolean;
};

const workedHoursAndSalary = { hours: 0, salary: 0 };

const SalaryCalc: React.FC<Props> = ({ update }) => {
  const weeksSheets = weekDays.map((item, index) => ({
    day: item,
    hours: Math.floor(Math.random() * (8 - 0 + 1) + 0),
    weekend: index === 5 || index === 6,
  }));

  const [data, setData] = useState<WeeksSheet[]>(weeksSheets);
  const [totalHoursAndSalary, setTotalHoursAndSalary] = useState(workedHoursAndSalary);
  const [loading, setLoading] = useState(false);

  const clickHandle = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ): void => {
    const value = Number(e.target.value);
    const newData = [...data];
    newData[index].hours = value;
    setData(newData);
  };

  useEffect(() => {
    const newTotal = { hours: 0, salary: 0 };

    data.forEach((item) => {
      newTotal.hours += item.hours;
      newTotal.salary += item.hours * (item.weekend ? 20 : 10);
    });

    setTotalHoursAndSalary(newTotal);
  }, [data]);

  useEffect(() => {
    setData(weeksSheets);
  }, [update]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      setLoading(true);
      clearTimeout(timeOut);
    };
  }, [data, update]);

  return (
    <div className="content">
      <div>
        {data.map((item, index) => (
          <div className="inputs__list" key={item.day}>
            <div className="input__wrapper">
              <input
                className="input"
                type="number"
                min="0"
                max="24"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  if (Number(e.target.value) <= 24) {
                    clickHandle(e, index);
                  }
                }}
                value={item.hours}
                id={item.day}
              />
              <label className="input__label" htmlFor={item.day}>
                {item.day}
              </label>
            </div>

            <span className="input__salary">
              {!loading
                ? `€${(item.hours * (item.weekend ? 20 : 10)).toFixed(2)}`
                : 0}
            </span>
          </div>
        ))}
      </div>

      <div className="total">
        <div className="total__hours">
          <span>Hours worked</span>
          <span>{totalHoursAndSalary.hours}</span>
        </div>
        <div className="total__salary">
          <span>Salary</span>
          <span>
            {!loading ? `€${totalHoursAndSalary.salary.toFixed(2)}` : 0}
          </span>
        </div>
      </div>

      {loading ? (
        <img className="loading__image" src="loading.gif" alt="loading" />
      ) : (
        ''
      )}
    </div>
  );
};

export default SalaryCalc;
