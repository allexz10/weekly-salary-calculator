import './App.scss';
import { useEffect, useState } from 'react';
import Dropdown from './components/Dropdown/Dropdown';
import SalaryCalc from './components/SalaryCalc/SalaryCalc';
import weeksList from './data/weeksList';
import employeeList, { pickRandomEmployee } from './data/employeeList';

const employee = pickRandomEmployee(employeeList);

const App = () => {
  const [userData, setUserData] = useState({
    employee: employee[0],
    weeks: weeksList[0],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setLoading(false);
    }, 50);

    return () => {
      setLoading(true);
      clearTimeout(timeOut);
    };
  }, [userData]);

  return (
    <div className="App">
      <div className="dropdown__wrapper">
        <Dropdown
          option={pickRandomEmployee(employeeList)}
          value={userData.employee}
          onChange={(value) => setUserData({ ...userData, employee: value })}
          label="Employee"
        />
        <Dropdown
          option={weeksList}
          value={userData.weeks}
          onChange={(value) => setUserData({ ...userData, weeks: value })}
          label="Week"
        />
      </div>
      <SalaryCalc update={loading} />
    </div>
  );
};

export default App;
