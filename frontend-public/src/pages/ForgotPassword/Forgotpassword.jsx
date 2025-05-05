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
      <div className="formforgotpass">
        <form>
          <h2 className="forgot-title">FORGOT <br/> PASSWORD?</h2>
          <div className="div-forgotinfo">
          <p className="info-forgot">Write your E-Mail down so we can send you a recover code to get back into your account or change your password.</p>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label-forgot">E-MAIL</label>
            <input type="email" id="email" name="email" className="form-control formcontrol-forgot" />
          </div>
          <div className="center-btnforgot">
          <button type="submit" className="btn btn-primary">SEND</button>
          </div>
        </form>
      </div>

      {/* Imagen */}
      <div className="imgforgotpass" data-aos="fade-in">
        <img src="/forgotpassword-bg.png" alt="Imagen recuperación" />
      </div>
    </div>
  );
};

export default ForgotPassword;
