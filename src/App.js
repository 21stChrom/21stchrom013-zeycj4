import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import EmployeeForm from './EmployeeForm';
import EmployeeChart from './EmployeeChart';
import { CategoryScale, Chart, LinearScale, PointElement, LineController, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineController, LineElement);

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [employees]);

  const saveData = () => localforage.setItem('employeeData', employees);

  const loadData = async () => {
  const loadData = async () => {
    const data = await localforage.getItem('employeeData');
    if (data) {
      setEmployees(data);
    }
  };

  const addEmployee = employee => {
    setEmployees([...employees, employee]);
  };

  return (
    <div>
      <EmployeeForm addEmployee={addEmployee} />
      {employees.map((employee, i) => (
        <EmployeeChart key={i} employee={employee} />
      ))}
    </div>
  );
}

export default App;
