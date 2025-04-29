import React, { useEffect } from 'react';
import './Login.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importamos el archivo de estilos de AOS

const Login = () => {
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
  {/* Fondo */}
  <div className="backlogin"></div>

  {/* Contenido del login */}
  <div className="container d-flex align-items-center justify-content-center min-vh-100 position-relative" style={{ zIndex: 1 }}>
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <div className="text-center mb-4" data-aos="fade-in">
        <img src="/virtualangelogo.png" alt="Logo" className="img-fluid" style={{ maxHeight: '200px' }} />
      </div>

      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label text-start d-block">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Enter your username" />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="form-label text-start d-block">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your password" />
        </div>

        <div className="mb-3 text-start">
          <a href="#" className="text-decoration-underline small">Forgot your password?</a>
        </div>

        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>

        <div className="text-center">
          <a href="#" className="text-decoration-underline small">Don't have an account?</a>
        </div>
      </form>
    </div>
  </div>
</>
  );
};

export default Login;
