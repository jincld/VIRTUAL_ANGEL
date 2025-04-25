import React, { useEffect } from 'react';
import './Shirts.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CardClothing from '../../components/cardClothing/CardClothing.jsx';

const Shirts = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,  // Duración de la animación
      easing: 'ease-in-out',  // Efecto de aceleración
      once: true,  // Ejecutar la animación solo una vez
      offset: 200,  // Desplazamiento desde el top para que inicie la animación
    });
  }, []);

  return (
    <>
      {/* Fondo fijo detrás del contenido */}
      <div className="backshirts"></div>

      {/* Contenedor del contenido encima del fondo */}
      <div className="container content-zone py-5">

      <div className="title-wrapper">
        <h1 className="shirtstitle">SHIRTS</h1>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">

          <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta" precio="12.99" enlace="terms" />
          </div>
          <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 2" precio="11.99" enlace="terms" />
          </div>
          <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 3" precio="11.99" enlace="terms" />
          </div>
          <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 4" precio="111.99" enlace="terms" />
          </div>


          <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 5" precio="111.99" enlace="terms" />
          </div>
          <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 6" precio="111.99" enlace="terms" />
          </div>
          <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 7" precio="111.99" enlace="terms" />
          </div>
          <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 8" precio="111.99" enlace="terms" />
          </div>


            <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 5" precio="111.99" enlace="terms" />
          </div>
          <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 6" precio="111.99" enlace="terms" />
          </div>
          <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 7" precio="111.99" enlace="terms" />
          </div>
          <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 8" precio="111.99" enlace="terms" />
          </div>


            <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 5" precio="111.99" enlace="terms" />
          </div>
          <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 6" precio="111.99" enlace="terms" />
          </div>
          <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 7" precio="111.99" enlace="terms" />
          </div>
          <div className="col d-flex justify-content-center" data-aos="fade-up">
            <CardClothing imagen="/shirts1.png" titulo="Camiseta 8" precio="111.99" enlace="terms" />
          </div>

        </div>
      </div>
    </>
  );
};

export default Shirts;
