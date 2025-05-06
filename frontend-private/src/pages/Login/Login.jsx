import React, { useEffect, useState } from 'react';
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

  const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

  return (
<>
  {/* Fondo */}
  <div className="backlogin"></div>

  {/* Contenido del login */}
  <div className="login-wrapper">
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <div className="text-center mb-4" data-aos="fade-in">
        <img src="/virtualangelogo.png" alt="Logo" className="img-fluid loginlogo"/>
      </div>

      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label text-start d-block label-login">USERNAME</label>
          <input type="text" className="form-control formlogin" id="username" placeholder="" />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="form-label text-start d-block label-login">PASSWORD</label>
          <div className="password-input-container">
  <input
    type={showPassword ? "text" : "password"}
    className="form-control formlogin"
    id="password"
    placeholder=""
  />
  <button
    type="button"
    className="show-loginpassword"
    onClick={togglePasswordVisibility}
  >
    {showPassword ? "HIDE" : "SHOW"}
  </button>
</div>

        </div>

        <div className="mb-3 text-start">
          <a href="/forgotpassword" className="text-decoration-underline small forgotstyle">FORGOT PASSWORD?</a>
        </div>

        <div className="d-flex justify-content-center mb-3">
  <button type="submit" className="btn btnlogin">LOGIN</button>
</div>

        <div className="text-center">
          <a href="/createaccount" className="text-decoration-underline small accountstyle">DON'T HAVE AN ACCOUNT?</a>
        </div>
        
      </form>
    </div>
  </div>
</>
  );
};

export default Login;
