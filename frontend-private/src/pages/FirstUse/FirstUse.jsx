import React from 'react';
import './FirstUse.css';

const FirstUse = () => {
  return (
    <div className="backfirstuse text-white">
      <div className="container py-5">
        <h2 className="fw-bold mb-3 welcome-title">WELCOME</h2>
        <hr className="border-light mb-4" />

        <div className="equal-height-row">
          {/* Imagen */}
          <div className="image-side">
            <img
              src="/iconFU.png"
              alt="Welcome icon"
              className="img-fluid full-height-img"
            />
          </div>

          {/* Texto */}
          <div className="text-first-container">
            <div className="text-wrapper">
              <p className="info-firstuse">
                Welcome to the Virtual Angel admin portal! Our cutting-edge web
                system streamlines the management of our alternative clothing
                store, enabling you to efficiently handle inventory, process
                orders, and support our customers.
              </p>
              <p className="info-firstuse">
                With intuitive navigation and powerful tools, you'll find it easy
                to keep our gothic, punk, and vintage-inspired collections
                up-to-date and ensure a smooth shopping experience for our
                customers.
              </p>
              <div className="button-wrapper">
            <a href="/inicio" className="btn btn-danger mt-3 btn-startfirstuse">LET'S START →</a>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstUse;
