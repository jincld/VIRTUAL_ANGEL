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
                  <NavLink className="nav-link itemnav" to="/clothing" activeclassname="active">CLOTHING</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link itemnav" to="/news" activeclassname="active">NEW</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link itemnav" to="/cart" activeclassname="active">CART</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link itemnav" to="/lookbook" activeclassname="active">LOOKBOOK</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link itemnav" to="/purchases" activeclassname="active">PURCHASES</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link itemnav" to="/searchpage" activeclassname="active">SEARCH</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link itemnav" to="/profileclient" activeclassname="active">PROFILE</NavLink>
                </li>
              </ul>
            </div>
          </div>
      </nav>
      </>
    );
}

export default Nav;
