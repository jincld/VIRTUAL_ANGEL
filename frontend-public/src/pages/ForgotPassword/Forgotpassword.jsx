import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Forgotpassword.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

const onSubmit = async ({ email }) => {
  try {
    await axios.post("http://localhost:3001/api/passwordRecovery/requestCode", { email }, { withCredentials: true });
    sessionStorage.setItem("canAccessVerifyCode", "true");
    window.location.href = "/verifycode";
  } catch (error) {
    console.error("Error sending recovery code", error);
    setMessage("Failed to send recovery code. Please try again.");
    setTimeout(() => setMessage(''), 5000);
  }
};

  return (
    <div className="forgot-container">
      <a href="/" className="back-button-forgotpassword" aria-label="Go back">&lt;</a>
      <div className="formforgotpass">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="forgot-title">FORGOT <br /> PASSWORD?</h2>
          <div className="div-forgotinfo">
            <p className="info-forgot">
              Write your E-Mail down so we can send you a recover code to get back into your account or change your password.
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label-forgot">E-MAIL</label>
            <input
              type="email"
              id="email"
              className="form-control formcontrol-forgot"
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
          {message && (
            <div className="alert alert-custom-error mt-3" role="alert">
              {message}
            </div>
          )}
          <div className="center-btnforgot">
            <button type="submit" className="btn btn-forgot">SEND</button>
          </div>
        </form>
      </div>
      <div className="imgforgotpass" data-aos="fade-in">
        <img srcSet="/forgotpassword-bg.png 1024w, /forgotpass-sm.png 480w" sizes="(max-width: 975px) 480px, 1024px" src="/forgotpassword-bg.png" alt="Image recover" />
      </div>
    </div>
  );
};

export default ForgotPassword;
