import React from "react";
import { NavLink } from "react-router-dom";  // Usamos NavLink en vez de Link
import './nav.css';

function Nav() {
    return (
      <>
      <nav className="navbar navbary navbar-expand-lg bg-body-tertiary w-100">
        <div className="navbar navbary navbar-expand-lg bg-body-tertiary">
          <a className="navbar-brand itemnav" aria-current="page" href="/home">
              <img src="/virtualangelogo.png" alt="VIRTUAL ANGEL" width="170"/>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  {/* Usamos NavLink para poder resaltar el enlace activo */}
                  <NavLink className="nav-link itemnav" to="/contact" activeClassName="active">SALES</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link itemnav" to="/contact" activeClassName="active">PRODUCTS</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link itemnav" to="/contact" activeClassName="active">COLLECTIONS</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link itemnav" to="/contact" activeClassName="active">ORDERS</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link itemnav" to="/contact" activeClassName="active">EMPLOYEES</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link itemnav" to="/" activeClassName="active">LOGIN</NavLink>
                </li>
              </ul>
            </div>
          </div>
      </nav>
      </>
    );
}

export default Nav;
