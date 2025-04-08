import React from "react";
import './nav.css';

function Nav() {
    return (
      <>
<nav className="navbar navbary navbar-expand-lg bg-body-tertiary w-100">
<div className="navbar navbary navbar-expand-lg bg-body-tertiary">
  <a className="navbar-brand itemnav" aria-current="page" href="#">
      <img src="/virtualangelogo.png" alt="VIRTUAL ANGEL" width="170"/>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link itemnav" href="#">CLOTHING</a>
        </li>
        <li className="nav-item">
          <a className="nav-link itemnav" href="#">ACCESORIES</a>
        </li>
        <li className="nav-item">
          <a className="nav-link itemnav" href="#">NEW</a>
        </li>
        <li className="nav-item">
          <a className="nav-link itemnav" href="#">CART</a>
        </li>
        <li className="nav-item">
          <a className="nav-link itemnav" href="#">SEARCH</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
      </>
    );
  }
  
  export default Nav;