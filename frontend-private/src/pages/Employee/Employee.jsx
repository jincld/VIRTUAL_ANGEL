import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Employees.css';
import AOS from 'aos';
import { NavLink } from 'react-router-dom';
import 'aos/dist/aos.css';
import CardEmployee from '../../components/cardEmployees/CardEmployee.jsx';
import employeesData from './EmployeeData.jsx';

const Employees = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [genderFilter, setGenderFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  const toggleFilters = () => setShowFilters(!showFilters);

  const clearFilters = () => {
    setQuery('');
    setGenderFilter('');
    setRoleFilter('');
  };

  const filteredEmployees = employeesData.filter((employee) => {
    const matchSearch =
      employee.name.toLowerCase().includes(query.toLowerCase()) ||
      employee.email.toLowerCase().includes(query.toLowerCase()) ||
      employee.rol.toLowerCase().includes(query.toLowerCase());

    const matchFilters =
      (genderFilter ? employee.gender === genderFilter : true) &&
      (roleFilter ? employee.rol === roleFilter : true);

    return matchSearch && matchFilters;
  });

  return (
    <>
      <div className="backemployees"></div>
      <div className="container content-zone py-5">
        <div className="title-wrapper text-center">
          <h1 className="employeestitle">
            {roleFilter ? roleFilter.toUpperCase() : 'ALL EMPLOYEES'}
          </h1>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
          <input
            type="text"
            placeholder="Search for employees..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input form-control input-style"
            style={{ maxWidth: '400px' }}
          />
          <button className="btn btnfilters" onClick={toggleFilters}>
            {showFilters ? 'Hide filters' : 'Show filters'}
          </button>
          <div>
            <a href="/addemployee" className="btn btn-addemployees"> + Add Employee</a>
          </div>
        </div>

        {showFilters && (
          <div className="filter-menu p-4 mt-3 rounded shadow-sm">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Gender:</label>
                <select className="form-select" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                  <option value="">All</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Role:</label>
                <select className="form-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                  <option value="">All</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
            </div>

            <div className="row mt-3 align-items-center">
              <div className="col-md-3 text-end">
                <button className="btn btn-limpiar" onClick={clearFilters}>Clear filters</button>
              </div>
            </div>
          </div>
        )}

        {filteredEmployees.length === 0 && (
          <div className="text-center text-light bg-dark p-4 rounded my-4 shadow">
            <h5>No employees found with the selected filters or search.</h5>
          </div>
        )}

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
          {filteredEmployees.map((employee) => (
            <div
              className="col d-flex justify-content-center"
              data-aos="fade-up"
              key={employee.id}
            >
              <CardEmployee
                id={employee.id}
                imagen={employee.imagen}
                name={employee.name}
                age={employee.age}
                gender={employee.gender}
                phone={employee.phone}
                email={employee.email}
                rol={employee.rol}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Employees;




