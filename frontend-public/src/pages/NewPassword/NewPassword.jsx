import React, { useEffect, useState } from 'react'; 
import './NewPassword.css'; 
import AOS from 'aos'; 
import 'aos/dist/aos.css';

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false); // Estado para la visibilidad de la nueva contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para la visibilidad de la confirmación de contraseña

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 200,
    });
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Alternar visibilidad de la nueva contraseña
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Alternar visibilidad de la confirmación de la contraseña
  };

  return (
    <div className="newpassword-container">
      <a href="/verifycode" className="back-button-newpassword" aria-label="Go back">
  &lt;
</a>
      {/* Formulario */}
      <div className="formnewpassword">
        <form>
          <h2 className="newpassword-title">NEW <br/> PASSWORD</h2>
          <div className="div-newpasswordinfo">
            <p className="info-newpassword">Enter your new password below to secure your account.</p>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label-newpassword">NEW PASSWORD</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"} // Si showPassword es true, el tipo es "text", sino "password"
                id="password"
                name="password"
                className="form-control formcontrol-newpassword"
              />
              <button 
                type="button" 
                className="show-newpassword" // Aplicamos la clase aquí
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            <br />
            <label htmlFor="confirm-password" className="form-label-newpassword">CONFIRM NEW PASSWORD</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"} // Si showConfirmPassword es true, el tipo es "text", sino "password"
                id="confirm-password"
                name="confirm-password"
                className="form-control formcontrol-newpassword"
              />
              <button 
                type="button" 
                className="show-newpassword" // Aplicamos la clase aquí también
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>
          <div className="center-btnnewpassword">
            <a href="/home" className="btn btn-newpassword">CONTINUE</a>
          </div>
        </form>
      </div>

      {/* Imagen */}
      <div className="imgnewpassword" data-aos="fade-in">
        <img 
          srcSet="/newpassword-bg.png 1024w, /newpassword-sm.png 480w" 
          sizes="(max-width: 975px) 480px, 1024px" 
          src="/newpassword-bg.png" 
          alt="Image for new password" 
        />
      </div>
    </div>
  );
};

export default NewPassword;
