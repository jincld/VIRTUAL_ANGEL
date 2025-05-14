import React, { useEffect, useState } from 'react';
import './Login.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        credentials: 'include', // Para que se guarden cookies
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.message === "Login successful") {
        navigate('/home'); // Redirige al home después del login
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error en login:", error);
      setMessage("Ocurrió un error al intentar iniciar sesión.");
    }
  };

  return (
    <>
      <div className="backlogin"></div>
      <div className="container">
      <div className="container d-flex align-items-center justify-content-center min-vh-100 position-relative" style={{ zIndex: 1 }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <div className="text-center mb-4" data-aos="fade-in">
            <img src="/virtualangelogo.png" alt="Logo" className="img-fluid loginlogo" />
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label text-start d-block label-login">USERNAME</label>
              <input type="text" className="form-control formlogin" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="form-label text-start d-block label-login">PASSWORD</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control formlogin"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="show-loginpassword" onClick={togglePasswordVisibility}>
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {message && <div className="mb-3 text-danger">{message}</div>}

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
      </div>
    </>
  );
};

export default Login;
