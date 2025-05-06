import React from "react";
import { Link } from "react-router-dom";  // Importamos Link desde react-router-dom
import './Footer.css';

function Footer() {
  return (
    <>
      <div className="container-fluid footer custom-footer text-white pt-5 px-0 position-relative overlay-top footercolor">
        <div className="row mx-0 pt-5 px-sm-3 px-lg-5">
          <div className="col-lg-3 col-md-6 mb-5" style={{ borderRight: "1px solid white" }}>
            <h4 className="text-white text-uppercase mb-4" style={{ letterSpacing: "3px" }}>
              CONTACT US
            </h4>
            {/* Cambié <a> por <Link> */}
            <Link className="linked" to="/contact">CONTACT US</Link>
            <br></br>
            <br></br>
            <p><i className="fa fa-phone-alt mr-2"></i>+7070-8120</p>
            <p className="m-0"><i className="fa fa-envelope mr-2"></i>virtualangel.style@gmail.com</p>
          </div>

          <div className="col-lg-3 col-md-6 mb-5" style={{ borderRight: "1px solid white" }}>
            <h4 className="text-white text-uppercase mb-4" style={{ letterSpacing: "3px" }}>
              SOCIAL MEDIA
            </h4>
            <h6 className="text-white text-uppercase">INSTAGRAM</h6>
            <p>@virtualangel</p>
            <h6 className="text-white text-uppercase">TIKTOK</h6>
            <p>@virtualangel.style</p>
          </div>

          <div className="col-lg-3 col-md-6 mb-5" style={{ borderRight: "1px solid white" }}>
            <h4 className="text-white text-uppercase mb-4" style={{ letterSpacing: "3px" }}>
              SHOP HOURS
            </h4>
            <div>
              <h6 className="text-white text-uppercase">Monday - Friday</h6>
              <p>9:00 AM - 6:00 PM</p>
              <h6 className="text-white text-uppercase">Saturday & Sunday</h6>
              <p>10:00 AM - 7:00 PM</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-white text-uppercase mb-4" style={{ letterSpacing: "3px" }}>
              COMPANY INFO
            </h4>
            <div>
              {/* Cambié <a> por <Link> */}
              <Link className="linked" to="/about">ABOUT US</Link>
              <br></br>
              <br></br>
              <Link className="linked" to="/terms">TERMS AND CONDITIONS</Link>
            </div>
          </div>

        </div>
        <div className="container-fluid text-center text-white mt-4 py-4 px-sm-3 px-md-5">
          <p className="mb-2 text-white">© 2025 Virtual Angel All rights reserved.</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
