import React, { useEffect, useState } from 'react';
import { TimeSheet } from '../../App';
import './SalaryCalculator.scss';

type Props = {
  timeSheet: TimeSheet[];
  updateEmployeeHours: (hours: number, dayTitle: string) => void;
};

const workedHoursAndSalary = { hours: 0, salary: 0 };

const SalaryCalculator: React.FC<Props> = ({
  timeSheet,
  updateEmployeeHours,
}) => {
  const [totalHoursAndSalary, setTotalHoursAndSalary] = useState(workedHoursAndSalary);
  const [loading, setLoading] = useState(false);

  const clickHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    dayTitle: string,
  ) => {
    const value = Number(e.target.value);
    updateEmployeeHours(value, dayTitle);
  };

  useEffect(() => {
    const newTotal = { hours: 0, salary: 0 };

    timeSheet.forEach((item) => {
      newTotal.hours += item.hours;
      newTotal.salary += item.hours * (item.weekend ? 20 : 10);
    });

    setTotalHoursAndSalary(newTotal);

    const timeOut = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      setLoading(true);
      clearTimeout(timeOut);
    };
  }, [timeSheet]);

  return (
    <div className="content">
      <div>
        {timeSheet.map((item) => (
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
                    clickHandler(e, item.day);
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

export default SalaryCalculator;
