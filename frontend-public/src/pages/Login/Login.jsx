import React, { useEffect, useState } from 'react';
import './Login.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../AuthToken.jsx'; // ✅ Importamos el AuthContext

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Obtenemos la función login del AuthContext
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (resData.message === "Login successful") {
        const { userType } = resData;

        // ✅ Guardamos userType en AuthContext (localStorage incluido)
        login(userType);

        // ✅ Redirigir según tipo de usuario
if (userType === 'admin' || userType === 'employee') {
  navigate('/firstuse'); // ✅ usar navigate en lugar de window.location.href
} else if (userType === 'client') {
  navigate('/home');
} else {
  setMessage("Unknown user type");
}


      } else {
        setMessage(resData.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setMessage("Ocurrió un error al intentar iniciar sesión.");
    }
  };

  return (
    <>
      <div className="backlogin"></div>
      <div className="container d-flex align-items-center justify-content-center min-vh-100 position-relative" style={{ zIndex: 1 }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <div className="text-center mb-4" data-aos="fade-in">
            <img src="/virtualangelogo.png" alt="Logo" className="img-fluid loginlogo" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-start d-block label-login">USERNAME</label>
              <input
                type="text"
                id="email"
                className="form-control formlogin"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email format"
                  }
                })}
              />
              {errors.email && <small className="text-danger">{errors.email.message}</small>}
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="form-label text-start d-block label-login">PASSWORD</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-control formlogin"
                  {...register("password", { required: "Password is required" })}
                />
                <button type="button" className="show-loginpassword" onClick={togglePasswordVisibility}>
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
              {errors.password && <small className="text-danger">{errors.password.message}</small>}
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
    </>
  );
};

export default Login;
