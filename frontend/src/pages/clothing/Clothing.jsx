import React, { useEffect } from 'react';
import './Clothing.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HoverImage from './HoverImage'; // Asegúrate que el path sea correcto

const Clothing = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 200,
    });
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="backclothing"></div>

        <div className="content-wrapper2">
          <h2 className="clothingtitle">CLOTHING</h2>

          <div className="container">
            <div className="row justify-content-center g-3">
            <div className="col-6 col-md-4 d-flex justify-content-center">
  <HoverImage
    src1="/shirts1.png"
    src2="/shirts2.png"
    alt="Shirt"
    href="/shirts" // Este es el link que activará el <Link> interno
  />
</div>

              <div className="col-6 col-md-4 d-flex justify-content-center">
                <HoverImage src1="/pants1.png" src2="/pants2.png" alt="Pants" href="/pants" />
              </div>
            </div>

            <div className="row justify-content-center g-3 mt-1">
              <div className="col-6 col-md-4 d-flex justify-content-center">
                <HoverImage src1="/jackets1.png" src2="/jackets2.png" alt="Jacket" href="/jackets"/>
              </div>
              <div className="col-6 col-md-4 d-flex justify-content-center">
                <HoverImage src1="/sweaters1.png" src2="/sweaters2.png" alt="Sweater" href="/sweaters" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clothing;
