import React, { useEffect } from 'react'; 
import './Forgotpassword.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ForgotPassword = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 200,
    });
  }, []);

  return (
    <div className="forgot-container ">
      {/* Formulario */}
      <div className="formforgotpass" data-aos="fade-left">
        <form>
          <h2>Recuperar contraseña</h2>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input type="email" id="email" name="email" className="form-control" placeholder="Ingresa tu correo" required />
          </div>
          <button type="submit" className="btn btn-primary">Enviar código</button>
        </form>
      </div>

      {/* Imagen */}
      <div className="imgforgotpass" data-aos="fade-right">
        <img src="/forgotpassword-bg.png" alt="Imagen recuperación" />
      </div>
    </div>
  );
};

export default ForgotPassword;
