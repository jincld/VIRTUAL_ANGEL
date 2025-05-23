import React, { useEffect, useRef, useState } from 'react';
import './addEmployee.css';
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from 'react-hook-form';

const AddEmployee = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('age', data.age);
    formData.append('gender', data.gender);
    formData.append('rol', data.rol);
    formData.append('password', data.password);
    formData.append('imagen', imageFile);

    try {
      const response = await fetch('http://localhost:3001/api/registerEmployees', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const resData = await response.json();

      if (response.ok) {
        alert(resData.message || 'Empleado registrado correctamente');
        reset();
        setImageFile(null);
        setImagePreview('');
      } else {
        alert(resData.message || 'Error al registrar empleado');
      }
    } catch (error) {
      console.error('❌ Error al guardar el empleado:', error);
      alert('Ocurrió un error al guardar el empleado');
    }
  };

  return (
    <>
      <div className="backaddemployee"></div>
      <div className="btn-marginpd margin-top-global">
        <Link to="/employee" className="ap-btn-back">← BACK</Link>
      </div>

      <div className="ap-wrapper">
        <h2 className="text-center text-black mb-4 addemployee-title">ADD NEW EMPLOYEE</h2>
        <div className="ap-card rounded p-4 shadow">
          <form className="row g-4" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            {/* Imagen */}
            <div className="col-md-5 text-center d-flex flex-column align-items-center justify-content-start">
              <div className="mb-3 w-100">
                <img
                  src={imagePreview || '/holder-newemployee.png'}
                  alt="Preview"
                  className="img-fluid ap-img-preview"
                />
              </div>
              <div className="d-flex gap-2 mb-3 w-100 justify-content-center">
                <button type="button" className="btn ap-btn-upload w-50 btnupload-image" onClick={handleUpload}>Upload Image</button>
                <button type="button" className="btn ap-btn-clear w-50" onClick={() => {
                  reset();
                  setImageFile(null);
                  setImagePreview('');
                }}>Clear Form</button>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              <button type="submit" className="btn ap-btn-save w-100 btnsaveemployee">Save Employee</button>
            </div>

            {/* Formulario */}
            <div className="col-md-7">
              <div className="row g-3">
                {/* Campos como antes... */}
                <div className="col-6">
                  <label className="form-label ap-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ap-input ${errors.name ? 'is-invalid' : ''}`}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                {/* Email */}
                <div className="col-6">
                  <label className="form-label ap-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ap-input ${errors.email ? 'is-invalid' : ''}`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email format',
                      },
                    })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="col-6">
                  <label className="form-label ap-label">Phone</label>
                  <input
                    type="text"
                    className={`form-control ap-input ${errors.phone ? 'is-invalid' : ''}`}
                    {...register('phone', { required: 'Phone is required' })}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                </div>

                <div className="col-6">
                  <label className="form-label ap-label">Age</label>
                  <input
                    type="number"
                    className={`form-control ap-input ${errors.age ? 'is-invalid' : ''}`}
                    {...register('age', {
                      required: 'Age is required',
                      min: { value: 18, message: 'Must be at least 18' },
                      max: { value: 65, message: 'Max age is 65' },
                    })}
                  />
                  {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
                </div>

                <div className="col-6">
                  <label className="form-label ap-label">Gender</label>
                  <select
                    className={`form-select ap-input ${errors.gender ? 'is-invalid' : ''}`}
                    {...register('gender', { required: 'Gender is required' })}
                  >
                    <option value="">Select</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                  {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
                </div>

                <div className="col-6">
                  <label className="form-label ap-label">Role</label>
                  <select
                    className={`form-select ap-input ${errors.rol ? 'is-invalid' : ''}`}
                    {...register('rol', { required: 'Role is required' })}
                  >
                    <option value="">Select</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                  </select>
                  {errors.rol && <div className="invalid-feedback">{errors.rol.message}</div>}
                </div>

                <div className="col-12">
                  <label className="form-label ap-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ap-input ${errors.password ? 'is-invalid' : ''}`}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Minimum 6 characters' },
                    })}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>

                <input type="hidden" {...register('imagen')} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
