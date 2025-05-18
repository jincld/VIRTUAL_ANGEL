import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './NewPassword.css';

const NewPassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // 🚫 Protección inmediata ANTES del render
  const canAccess = sessionStorage.getItem("canAccessNewPassword");
  useEffect(() => {
    if (!canAccess) {
      navigate("/verifycode");
    }
  }, [canAccess, navigate]);

  if (!canAccess) {
    return null; // evita render si no se permite el acceso
  }

  const onSubmit = async (data) => {
    try {
      await axios.post(
        "http://localhost:3001/api/passwordRecovery/newPassword",
        { password: data.password },
        { withCredentials: true }
      );

      sessionStorage.removeItem("canAccessNewPassword");
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password", error);
      setMessage("There was an error. Please try again.");
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div className="newpassword-container">
      <a href="/verifycode" className="back-button-newpassword" aria-label="Go back">&lt;</a>

      <div className="imgnewpassword">
        <img src="/newpassword-bg.png" alt="Reset Password" />
      </div>

      <div className="formnewpassword">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="newpassword-title">SET NEW<br />PASSWORD</h2>
          <p className="info-newpassword">Enter and confirm your new password.</p>

          <div className="mb-3">
            <label htmlFor="password" className="form-label-new">NEW PASSWORD</label>
            <input
              type="password"
              id="password"
              className="form-control formcontrol-new"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
            {errors.password && <small className="text-login-format-error">{errors.password.message}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label-new">CONFIRM PASSWORD</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control formcontrol-new"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: value => value === watch("password") || "Passwords do not match"
              })}
            />
            {errors.confirmPassword && <small className="text-login-format-error">{errors.confirmPassword.message}</small>}
          </div>

          {message && (
            <div className="alert alert-custom-error mt-3" role="alert">
              {message}
            </div>
          )}

          <div className="center-btnnew">
            <button type="submit" className="btn btn-newpassword">RESET PASSWORD</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
