import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import './VerifyCode.css'; 
import AOS from 'aos'; 
import 'aos/dist/aos.css';

const VerifyCode = () => {
  const navigate = useNavigate();  // Inicializa el hook useNavigate

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 200,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();  // Evita el comportamiento predeterminado del formulario
    navigate('/about');  // Redirige a /about (puedes cambiar la ruta de destino si es necesario)
  };

  return (
    <div className="verify-container ">
            <a href="/forgotpassword" className="back-button-verifycode" aria-label="Go back">
  &lt;
</a>
      {/* Imagen */}
      <div className="imgverifycode" data-aos="fade-in">
        <img 
          srcSet="/verifycode-bg.png 1024w, /verifycode-sm.png 480w" 
          sizes="(max-width: 975px) 480px, 1024px" 
          src="/verifycode-bg.png" 
          alt="Image verification" 
        />
      </div>

            {/* Formulario */}
            <div className="formverifycode">
        <form onSubmit={handleSubmit}>
          <h2 className="verify-title">VERIFY YOUR<br/> CODE</h2>
          <div className="div-verifyinfo">
            <p className="info-verify">Please enter the verification code sent to your email to proceed.</p>
          </div>
          <div className="mb-3">
            <label htmlFor="code" className="form-label-verify">VERIFICATION CODE</label>
            <input type="text" id="code" name="code" className="form-control formcontrol-verify" />
          </div>
          <div className="center-btnverify">
  <a href="/newpassword" className="btn btn-verify">VERIFY</a>
</div>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
