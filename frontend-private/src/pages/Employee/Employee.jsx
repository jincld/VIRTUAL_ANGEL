import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Employees.css';
import AOS from 'aos';
import { NavLink } from 'react-router-dom';
import 'aos/dist/aos.css';
import CardEmployee from '../../components/cardEmployees/CardEmployee.jsx';

const Employees = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [genderFilter, setGenderFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (location.state?.shouldRefetch) {
      fetchEmployees();
      // Limpiar el estado para que no vuelva a recargar al navegar
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/employee');
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();

      const empleados = Array.isArray(data)
        ? data
        : Array.isArray(data.employees)
        ? data.employees
        : [];

      setEmployees(empleados);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setLoading(false);
    }
  };

  const toggleFilters = () => setShowFilters(!showFilters);

  const clearFilters = () => {
    setQuery('');
    setGenderFilter('');
    setRoleFilter('');
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchSearch =
      employee.name.toLowerCase().includes(query.toLowerCase()) ||
      employee.email.toLowerCase().includes(query.toLowerCase()) ||
      employee.rol.toLowerCase().includes(query.toLowerCase());

    const matchFilters =
      (genderFilter ? employee.gender.toLowerCase() === genderFilter.toLowerCase() : true) &&
      (roleFilter ? employee.rol.toLowerCase() === roleFilter.toLowerCase() : true);

    return matchSearch && matchFilters;
  });

  return (
    <>
      <div className="backemployees"></div>
      <div className="container content-zone py-5">
        <div className="title-wrapper text-center">
          <h1 className="employeestitle margin-top-global">
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
            <Link to="/addemployee" className="btn btn-addemployees">+ Add Employee</Link>
          </div>
        </div>

        {showFilters && (
          <div className="filter-menu p-4 mt-3 rounded shadow-sm">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Gender:</label>
                <select className="form-select" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                  <option value="">All</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Role:</label>
                <select className="form-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                  <option value="">All</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
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

        {loading ? (
          <div className="text-center text-light bg-dark p-4 rounded my-4 shadow">
            <h5>Loading employees...</h5>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="text-center text-light bg-dark p-4 rounded my-4 shadow">
            <h5>No employees found with the selected filters or search.</h5>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
            {filteredEmployees.map((employee) => {
              console.log(employee); // Útil para depurar si imagen u otros campos están vacíos
              return (
                <div
                  className="col d-flex justify-content-center"
                  data-aos="fade-up"
                  key={employee._id}
                >
                  <CardEmployee
                    id={employee._id}
                    imagen={employee.imagen || 'https://via.placeholder.com/150'}
                    name={employee.name}
                    age={employee.age}
                    gender={employee.gender}
                    phone={employee.phone}
                    email={employee.email}
                    rol={employee.rol}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Employees;
