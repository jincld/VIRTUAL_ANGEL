import React, { useEffect, useState } from 'react';
import './CreateAccount.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

const navigate = useNavigate();

const onSubmit = async (data) => {
  try {
    const res = await fetch('http://localhost:3001/api/registerClients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (res.ok) {
      setMessage("ACCOUNT CREATED SUCCESSFULLY, CHECK YOU EMAIL TO VERIFY YOUR ACCOUNT");
      reset();
      setTimeout(() => navigate("/"), 3000); // ✅ Redirigir a /
    } else {
      setMessage(resData.message || "ERROR CREATING ACCOUNT");
    }
  } catch (error) {
    console.error("ERROR CONNECTING WITH BACKEND:", error);
    setMessage("ERROR CONNECTING WITH SERVER");
  }

  setTimeout(() => setMessage(''), 5000);
};


  return (
    <div className="container-fluid">
      <div className="createaccount-card">
        <div className="createaccount-card__image"></div>
        <div className="createaccount-card__image_two">
          <h2 className="title-createaccount">CREATE <br /> ACCOUNT</h2>
          <div className="form-container">
            <form className="create-account-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group-createaccount">
                <label htmlFor="name" className="createaccount-label">NAME</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <small className="text-login-format-error">{errors.name.message}</small>}
              </div>

              <div className="input-group-createaccount">
                <label htmlFor="email" className="createaccount-label">E-MAIL</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && <small className="text-login-format-error">{errors.email.message}</small>}
              </div>

{/* AGE */}
<div className="input-group-createaccount">
  <label htmlFor="age" className="createaccount-label">AGE</label>
  <input
    type="number"
    id="age"
    {...register("age", {
      required: "Age is required",
      min: {
        value: 18,
        message: "You must be at least 18 years old"
      }
    })}
  />
  {errors.age && <small className="text-login-format-error">{errors.age.message}</small>}
</div>


{/* PHONE */}
<div className="input-group-createaccount">
  <label htmlFor="phone" className="createaccount-label">PHONE</label>
  <input
    type="text"
    id="phone"
    {...register("phone", {
      required: "Phone is required",
      minLength: { value: 8, message: "Phone must be at least 8 digits" }
    })}
  />
  {errors.phone && <small className="text-login-format-error">{errors.phone.message}</small>}
</div>

{/* GENDER */}
<div className="input-group-createaccount">
  <label htmlFor="gender" className="createaccount-label">GENDER</label>
  <select
    id="gender"
    {...register("gender", { required: "Gender is required" })}
    className="input-group-createaccount"
  >
    <option value="">Select gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
  {errors.gender && <small className="text-login-format-error">{errors.gender.message}</small>}
</div>


              <div className="input-group-createaccount">
                <label htmlFor="password" className="createaccount-label">PASSWORD</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="show-newpassword-create"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
                {errors.password && <small className="text-login-format-error">{errors.password.message}</small>}
              </div>

              

              {message && (
                <div className="alert alert-custom-error mt-3" role="alert">
                  {message}
                </div>
              )}

              <button type="submit" className="btn button-createaccount">REGISTER</button>
            </form>
          </div>
          <div className="div-create-to-login">
            <a href="/" className="createaccount-login">ALREADY HAVE ACCOUNT? LOG-IN</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
