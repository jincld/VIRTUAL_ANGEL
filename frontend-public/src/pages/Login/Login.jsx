import React, { useEffect, useState, useRef } from 'react';
import './Login.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../AuthToken.jsx';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const toastShown = useRef(false);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  // Mostrar toast solo 1 vez si viene de verificación o ya verificado
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const isVerified = queryParams.get("verified");
    const alreadyVerified = queryParams.get("alreadyVerified");

    if (!toastShown.current && (isVerified === "true" || alreadyVerified === "true")) {
      if (alreadyVerified === "true") {
        toast.success("Your account was already verified. Please log in.", { duration: 5000 });
      } else {
        toast.success("Your account has been successfully verified. Please log in.", { duration: 5000 });
      }
      toastShown.current = true;
    }

    // Limpiar los query params para que no vuelva a mostrar el toast al recargar
    if (isVerified === "true" || alreadyVerified === "true") {
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

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
        login(userType);

        const currentPort = window.location.port;
        let wrongAppMessage = '';

        if ((userType === 'admin' || userType === 'employee') && currentPort !== "5174") {
          wrongAppMessage = "You are in the wrong application. Please access the employee portal at http://localhost:5174";
        } else if (userType === 'client' && currentPort !== "5173") {
          wrongAppMessage = "You are in the wrong application. Please access the client portal at http://localhost:5173";
        }

        if (wrongAppMessage) {
          setMessage(wrongAppMessage);
          setTimeout(() => {
            setMessage('');
          }, 5000);
        } else {
          if (userType === 'admin' || userType === 'employee') {
            navigate('/firstuse');
          } else if (userType === 'client') {
            navigate('/home');
          } else {
            setMessage("Unknown user type");
          }
        }
      } else {
        setMessage(resData.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setMessage("An error occurred while trying to login.");
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
              <label htmlFor="email" className="form-label text-start d-block label-login">EMAIL</label>
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
              {errors.email && <small className="text-login-format-error">{errors.email.message}</small>}
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
              {errors.password && <small className="text-login-format-error">{errors.password.message}</small>}
            </div>

            {message && (
              <div
                className={`alert ${
                  message.includes("verified") ? "alert-custom-success" : "alert-custom-error"
                } mt-3`}
                role="alert"
              >
                {message}
              </div>
            )}

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
