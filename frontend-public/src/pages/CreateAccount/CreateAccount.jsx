import React, { useEffect, useState } from 'react';
import './CreateAccount.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importamos el archivo de estilos de AOS

const CreateAccount = () => {
  // Inicializamos AOS cuando el componente se monte
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones
      easing: 'ease-in-out', // Easing para las animaciones
      once: true, // Las animaciones solo se ejecutan una vez
      offset: 200, // Distancia desde la parte superior para iniciar la animación
    });
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="createaccount-card">
          <div className="createaccount-card__image"></div>
          <div className="createaccount-card__image_two">
          <h2 className="title-createaccount">CREATE <br></br> ACCOUNT</h2>
            {/* Formulario centrado */}
            <div className="form-container">
              <form className="create-account-form">
                <div className="input-group-createaccount">
                  <label htmlFor="name" className="createaccount-label">NAME</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="input-group-createaccount">
                  <label htmlFor="email" className="createaccount-label">E-MAIL</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="input-group-createaccount">
                  <label htmlFor="password" className="createaccount-label">PASSWORD</label>
                  <input type="password" id="password" name="password" required />
                </div>
              </form>
            </div>

            <div>
            <a href="/" className="btn button-createaccount ">REGISTER</a>
          </div>
          <div className="div-create-to-login">
          <a href="/" className="createaccount-login">ALREADY HAVE ACCOUNT? LOG-IN</a>
        </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
