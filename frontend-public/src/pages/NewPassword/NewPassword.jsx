import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewPassword.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NewPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 200,
    });

    // Protección de acceso: redirigir si no se accedió desde el flujo correcto
    if (!sessionStorage.getItem("canAccessNewPassword")) {
      navigate("/verifycode");
    }
  }, []);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async ({ password }) => {
    try {
      await axios.post(
        "http://localhost:3001/api/passwordRecovery/newPassword",
        { newPassword: password },
        { withCredentials: true }
      );
      
      toast.success("Password updated successfully");
      
      sessionStorage.removeItem("canAccessNewPassword");
      
      // Esperá 2 segundos antes de redirigir
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      console.error("Error updating password", error);
      setMessage("Failed to update password. Please try again.");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="newpassword-container">
      <a href="/verifycode" className="back-button-newpassword" aria-label="Go back">&lt;</a>

      <div className="formnewpassword">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="newpassword-title">NEW <br /> PASSWORD</h2>
          <div className="div-newpasswordinfo">
            <p className="info-newpassword">Enter your new password below to secure your account.</p>
          </div>

          {/* Nueva contraseña */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label-newpassword">NEW PASSWORD</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control formcontrol-newpassword"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                    message: "Must include letters and numbers"
                  }
                })}
              />
              <button type="button" className="show-newpassword" onClick={togglePasswordVisibility}>
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            {errors.password && <small className="text-login-format-error">{errors.password.message}</small>}

            {/* Confirmar contraseña */}
            <br />
            <label htmlFor="confirm" className="form-label-newpassword">CONFIRM NEW PASSWORD</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm"
                className="form-control formcontrol-newpassword"
                {...register("confirm", {
                  required: "Please confirm your password",
                  validate: value =>
                    value === password || "Passwords do not match",
                })}
              />
              <button type="button" className="show-newpassword" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            {errors.confirm && <small className="text-login-format-error">{errors.confirm.message}</small>}
          </div>

          {/* Mensaje de error general */}
          {message && (
            <div className="alert alert-custom-error mt-3" role="alert">
              {message}
            </div>
          )}

          <div className="center-btnnewpassword">
            <button type="submit" className="btn btn-newpassword">CONTINUE</button>
          </div>
        </form>
      </div>

      {/* Imagen lateral */}
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
