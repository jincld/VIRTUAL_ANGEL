import React, { useEffect } from 'react';
import './Contact.css';
import AOS from 'aos'; // Importa la librería de AOS
import 'aos/dist/aos.css'; // Importa los estilos de AOS

const Contact = () => {
  // Inicializamos AOS en el useEffect para que se ejecute cuando el componente se monte
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación
      easing: 'ease-in-out', // Easing para las animaciones
      once: true, // Animaciones solo se ejecutan una vez
      offset: 200, // Distancia desde la parte superior para iniciar la animación
    });
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="back" data-aos="fade-in"></div>
        <div className="back2"></div>
        <div className="content-wrapper">
          <div className="colbg">
            <h1 className='contacttittle'>CONTACT US</h1>
            <br></br>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">EMAIL</span>
              <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
            </div>

            <div className="input-group">
              <span className="input-group-text">MESSAGE</span>
              <textarea className="form-control" aria-label="With textarea"></textarea>
            </div>
            
            <br></br>
            <button type="button" className="custom-send-btn">SEND</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
