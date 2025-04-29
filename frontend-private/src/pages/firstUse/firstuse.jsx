import React from 'react';
import './firstuse.css';

const FirstUse = () => {
  return (
    <div className="backfirstuse text-white">
      <div className="container py-5">
        <h2 className="fw-bold mb-3">WELCOME</h2>
        <hr className="border-light mb-4" />

        <div className="row align-items-center">
          {/* Imagen de bienvenida */}
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="/iconFU.png"
              alt="Welcome"
              className="img-fluid border border-danger firstimg"
            />
          </div>

          {/* Texto de presentación */}
          <div className="col-md-6 bg-dark p-4">
            <p>
              Welcome to the Virtual Angel admin portal! Our cutting-edge web
              system streamlines the management of our alternative clothing
              store, enabling you to efficiently handle inventory, process
              orders, and support our customers.
            </p>
            <p>
              With intuitive navigation and powerful tools, you'll find it easy
              to keep our gothic, punk, and vintage-inspired collections
              up-to-date and ensure a smooth shopping experience for our
              customers.
            </p>
            <button className="btn btn-danger mt-3">
              LET'S START →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstUse;
