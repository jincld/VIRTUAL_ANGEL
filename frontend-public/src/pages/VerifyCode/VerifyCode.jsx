import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './VerifyCode.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from 'react-hook-form';

const VerifyCode = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

const onSubmit = async ({ code }) => {
  try {
    await axios.post("http://localhost:3001/api/passwordRecovery/verifyCode", { code }, { withCredentials: true });
    sessionStorage.removeItem("canAccessVerifyCode");
    sessionStorage.setItem("canAccessNewPassword", "true");
    navigate("/newpassword");
  } catch (error) {
    console.error("Error verifying code", error);
    setMessage("Invalid or expired verification code.");
    setTimeout(() => setMessage(''), 5000);
  }
};


  return (
    <div className="verify-container">
      <a href="/forgotpassword" className="back-button-verifycode" aria-label="Go back">&lt;</a>
      <div className="imgverifycode" data-aos="fade-in">
        <img srcSet="/verifycode-bg.png 1024w, /verifycode-sm.png 480w" sizes="(max-width: 975px) 480px, 1024px" src="/verifycode-bg.png" alt="Image verification" />
      </div>
      <div className="formverifycode">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="verify-title">VERIFY YOUR<br /> CODE</h2>
          <div className="div-verifyinfo">
            <p className="info-verify">Please enter the verification code sent to your email to proceed.</p>
          </div>
          <div className="mb-3">
            <label htmlFor="code" className="form-label-verify">VERIFICATION CODE</label>
            <input
              type="text"
              id="code"
              className="form-control formcontrol-verify"
              {...register("code", {
                required: "Verification code is required",
                pattern: {
                  value: /^[0-9]{4,6}$/,
                  message: "Code must be 4 to 6 digits"
                }
              })}
            />
            {errors.code && <small className="text-login-format-error">{errors.code.message}</small>}
          </div>
          {message && (
            <div className="alert alert-custom-error mt-3" role="alert">
              {message}
            </div>
          )}
          <div className="center-btnverify">
            <button type="submit" className="btn btn-verify">VERIFY</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
