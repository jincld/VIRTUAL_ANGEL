import React from "react";
import { Link } from "react-router-dom";  // Importamos Link desde react-router-dom
import './nav.css';

function Nav() {
    return (
      <>
      <nav className="navbar navbary navbar-expand-lg bg-body-tertiary w-100">
        <div className="navbar navbary navbar-expand-lg bg-body-tertiary">
          <a className="navbar-brand itemnav" aria-current="page" href="/">
              <img src="/virtualangelogo.png" alt="VIRTUAL ANGEL" width="170"/>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  {/* Cambié <a> por <Link> */}
                  <Link className="nav-link itemnav" to="/clothing">CLOTHING</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link itemnav" to="/news">NEW</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link itemnav" to="#">CART</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link itemnav" to="#">SEARCH</Link>
                </li>
              </ul>
            </div>
          </div>
      </nav>
      </>
    );
}

export default Nav;
