import React, { useEffect } from 'react';
import './About.css';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; // Importamos el archivo de estilos de AOS

const About = () => {
  useEffect(() => {
    AOS.init(); // Inicializa AOS cuando el componente se monta
  }, []);

  return (
    <>
      <div className="container-fluid text-center ">
        <div className="row margin-top-global">
          <div className="col-12 col-md-6 info1" data-aos="fade" data-aos-duration="1000" data-aos-delay="100">
            <img src="/about1.png" className="d-block w-100" alt="..." />
          </div>
          <div className="col-12 col-md-6 info2"  data-aos="fade-left" data-aos-duration="1500">
            <img src="/abouttitle.png" className="d-block w-75 abouttitle" alt="..." />
            <p className="text1">
              Virtual Angel sells alternative clothing that seeks to be unique and original, it is aimed at a young audience that wants to stand out and express themselves through the clothes they wear without spending a fortune.
              <br />
              <br />
              Our products are made in an ethical way that seeks to be a more environmentally friendly option by applying conscious production techniques and high quality materials.
            </p>
          </div>
          <div className="col-12 col-md-6 info2" data-aos="fade-right" data-aos-duration="1500">
            <br />
            <br />
            <p className="text1">
              Virtual Angel offers a variety of alternative clothing, which means clothing that is out of the ordinary, the garments sold seek to reflect in a more extreme and direct way the personality of each client. We specialize in all types of garments and each one with an original design.
              <br />
              <br />
              An important part is that we have more accessible prices thinking that our young audience finds it difficult to access products this original but at a low cost.
            </p>
            <img src="/about3.png" className="d-block w-75 abouttitledown" alt="..." />
          </div>
          <div className="col-12 col-md-6 info1" data-aos="fade" data-aos-duration="1000" data-aos-delay="100">
            <img src="/about2.png" className="d-block w-100" alt="..." />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
