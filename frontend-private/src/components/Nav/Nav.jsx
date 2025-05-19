import React from "react";
import { NavLink, Link } from "react-router-dom";
import './nav.css';
import { useAuth } from '../../../../frontend-public/AuthToken'; // ajusta la ruta si es necesario

function Nav() {
  const { userType } = useAuth(); // <-- acceso al tipo de usuario

  return (
    <nav className="navbar navbary navbar-expand-lg bg-body-tertiary w-100">
      <div className="navbar navbary navbar-expand-lg bg-body-tertiary">
        <Link className="navbar-brand itemnav" to="/startpage">
          <img src="/virtualangelogo.png" alt="VIRTUAL ANGEL" width="170" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link itemnav ${isActive ? 'active' : ''}`} to="/sales">SALES</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link itemnav ${isActive ? 'active' : ''}`} to="/products">PRODUCTS</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link itemnav ${isActive ? 'active' : ''}`} to="/orders">ORDERS</NavLink>
            </li>

            {/* 🔒 Solo visible para admins */}
            {userType === 'admin' && (
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link itemnav ${isActive ? 'active' : ''}`} to="/employee">EMPLOYEES</NavLink>
              </li>
            )}

            {/* Siempre visible */}
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link itemnav ${isActive ? 'active' : ''}`} to="/">LOGIN</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
