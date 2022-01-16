import './App.scss';
import { useEffect, useState } from 'react';
import { getWeekList, generateEmployee, getRandomEmployees } from './data/utils';
import Dropdown from './components/Dropdown/Dropdown';
import SalaryCalculator from './components/SalaryCalculator/SalaryCalculator';
import employeeList from './data/employeeList';

const employeeNames = getRandomEmployees(employeeList);
const weekList = getWeekList();

export type TimeSheet = {
  day: string;
  hours: number;
  weekend: boolean;
};

export type Week = {
  period: string;
  timeSheet: TimeSheet[];
};

export type Employee = {
  name: string;
  id: string;
  weekList: Week[];
};

const App = () => {
  const [selectedWeek, setSelectedWeek] = useState(weekList[0]);
  const [currentTimeSheet, setCurrentTimeSheet] = useState<TimeSheet[]>([]);
  const [loading, setLoading] = useState(false);
  const [personData, setPersonData] = useState(() => {
    const local: Employee[] = JSON.parse(
      localStorage.getItem('employees') || '[]',
    );
    const newEmployee = generateEmployee(employeeNames[0], weekList);
    if (!local.find((item) => item.name === employeeNames[0])) {
      localStorage.setItem(
        'employees',
        JSON.stringify([...local, newEmployee]),
      );
    }

    return newEmployee;
  });

  const getEmployeeHours = () => {
    const week = personData.weekList.find((it) => it.period === selectedWeek);
    return week?.timeSheet || ([] as TimeSheet[]);
  };

  const updateEmployeeHours = (hours: number, dayTitle: string) => {
    const local: Employee[] = JSON.parse(
      localStorage.getItem('employees') || '[]',
    );

    const updatedWeek = personData.weekList.find((week) => week.period === selectedWeek)
      || ({} as Week);

    const updatedTimeSheet = updatedWeek?.timeSheet.map((day) => {
      if (day.day === dayTitle) {
        return { ...day, hours };
      }
      return day;
    });
    if (updatedTimeSheet) {
      setCurrentTimeSheet(updatedTimeSheet);
    }

    const newPersonData = {
      ...personData,
      weekList: personData.weekList.map((week) => {
        if (week.period === selectedWeek) {
          return { ...week, timeSheet: updatedTimeSheet };
        }
        return week;
      }),
    };

    setPersonData(newPersonData);
    const newEmployees = local.filter((it) => it.name !== personData.name);
    localStorage.setItem(
      'employees',
      JSON.stringify([...newEmployees, newPersonData]),
    );
  };

  const updateEmployee = (name: string) => {
    const local: Employee[] = JSON.parse(
      localStorage.getItem('employees') || '[]',
    );

    const newEmployee = generateEmployee(name, weekList);
    const findedEmployee = local.find((item) => item.name === name);
    if (findedEmployee) {
      setPersonData(findedEmployee);
    } else {
      localStorage.setItem(
        'employees',
        JSON.stringify([...local, newEmployee]),
      );
      setPersonData(newEmployee);
    }
  };

  useEffect(() => {
    setCurrentTimeSheet(getEmployeeHours());
  }, [selectedWeek, loading]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setLoading(false);
    }, 50);

    return () => {
      setLoading(true);
      clearTimeout(timeOut);
    };
  }, [personData, currentTimeSheet]);

  return (
    <div className="App">
      <div className="dropdown__wrapper">
        <Dropdown
          option={employeeNames}
          value={personData.name}
          onChange={(value) => updateEmployee(value)}
          label="Employee"
        />
        <Dropdown
          option={weekList}
          value={selectedWeek}
          onChange={(value) => {
            setSelectedWeek(value);
            setCurrentTimeSheet(getEmployeeHours());
          }}
          label="Week"
        />
      </div>

      <SalaryCalculator
        timeSheet={currentTimeSheet}
        updateEmployeeHours={(hours: number, dayTitle: string) => updateEmployeeHours(hours, dayTitle)}
      />
    </div>
  );
};

export default App;
