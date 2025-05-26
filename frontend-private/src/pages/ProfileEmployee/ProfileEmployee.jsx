import React, { useEffect, useRef, useState } from 'react';
import './ProfileEmployee.css';
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from 'react-hook-form';

const ProfileEmployee = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
    fetchUserData();
  }, []);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchUserData = async () => {
    try {
      const resMe = await fetch('http://localhost:3001/api/me', {
        credentials: 'include',
      });
      if (!resMe.ok) {
        alert('Not authenticated');
        navigate('/');
        return;
      }
      const meData = await resMe.json();

      const resUser = await fetch(`http://localhost:3001/api/employee/${meData.userId}`, {
        credentials: 'include',
      });
      if (!resUser.ok) {
        alert('Could not load user data');
        return;
      }
      const userData = await resUser.json();

      setUserId(userData._id);

      // Guardamos imagen en originalData para restaurar correctamente
      const dataForForm = {
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        age: userData.age || '',
        gender: userData.gender || '',
        rol: userData.rol || '',
        password: '', // no cargamos password en claro
        imagen: userData.imagen || '/holder-newemployee.png',
      };
      setOriginalData(dataForForm);

      reset(dataForForm);

      setImagePreview(dataForForm.imagen);

      setIsEditing(false);
      setImageFile(null);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleUpload = () => {
    if (!isEditing) return;
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCancelEdit = () => {
    if (originalData) {
      reset(originalData);
      setImageFile(null);
      setImagePreview(originalData.imagen || '/holder-newemployee.png');
    }
    setIsEditing(false);
  };

const onSubmit = async (data) => {
const noChanges =
  data.name === originalData.name &&
  data.email === originalData.email &&
  data.phone === originalData.phone &&
  String(data.age) === String(originalData.age) &&
  data.gender === originalData.gender &&
  !imageFile &&
  !data.password;  // <-- si password tiene texto, enviamos el formulario


  if (noChanges) {

    return; // evitas enviar el formulario
  }



    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('age', data.age);
    formData.append('gender', data.gender);
    if (data.password) {
      formData.append('password', data.password);
    }
    if (imageFile) {
      formData.append('imagen', imageFile);
    }

    try {
      const response = await fetch(`http://localhost:3001/api/employee/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });

      const resData = await response.json();

      if (response.ok) {
        alert(resData.message || 'Profile updated successfully');
        fetchUserData();
        setIsEditing(false);
        setImageFile(null);
      } else {
        alert(resData.message || 'Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        navigate('/');
      } else {
        alert('Failed to logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <div className="backaddemployee"></div>
      <div className="btn-marginpd margin-top-global">
      </div>
      <div className="ap-wrapper">
        <h2 className="text-center text-black mb-4 addemployee-title">
          {isEditing ? 'EDIT PROFILE' : 'PROFILE'}
        </h2>
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
                <button
                  type="button"
                  className="btn ap-btn-upload w-50 btnupload-image"
                  onClick={handleUpload}
                  disabled={!isEditing}
                >
                  Upload Image
                </button>
                {isEditing && (
                  <button
                    type="button"
                    className="btn ap-btn-clear w-50"
                    onClick={() => {
                      reset(originalData);
                      setImageFile(null);
                      setImagePreview(originalData.imagen || '/holder-newemployee.png');
                    }}
                  >
                    Clear Form
                  </button>
                )}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>

              {!isEditing ? (
                <>
<button
  type="button"  // <- esto evita submit
  className="btn ap-btn-save w-100 btnsaveemployee"
  onClick={() => setIsEditing(true)}
>
  EDIT PROFILE
</button>

                  <button type="button" className="btn ap-btn-save btn-logout w-100 mt-2" onClick={handleLogout}>
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <button type="submit" className="btn ap-btn-save w-100 btnsaveemployee">
                    SAVE CHANGES
                  </button>
                  <button type="button" className="btn ap-btn-save w-100 btnsaveemployee mt-2" onClick={handleCancelEdit}>
                    CANCEL EDIT
                  </button>
                </>
              )}
            </div>

            {/* Formulario */}
            <div className="col-md-7">
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label ap-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ap-input ${errors.name ? 'is-invalid' : ''}`}
                    {...register('name', { required: 'Name is required' })}
                    disabled={!isEditing}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

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
                    disabled={!isEditing}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="col-6">
                  <label className="form-label ap-label">Phone</label>
                  <input
                    type="text"
                    className={`form-control ap-input ${errors.phone ? 'is-invalid' : ''}`}
                    {...register('phone', { required: 'Phone is required' })}
                    disabled={!isEditing}
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
                    disabled={!isEditing}
                  />
                  {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
                </div>

                <div className="col-6">
                  <label className="form-label ap-label">Gender</label>
                  <select
                    className={`form-select ap-input ${errors.gender ? 'is-invalid' : ''}`}
                    {...register('gender', { required: 'Gender is required' })}
                    disabled={!isEditing}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
                </div>

                {/* Campo Rol: mostrar solo texto, no editable */}
                <div className="col-6">
                  <label className="form-label ap-label">Role</label>
                  <p
                    className="form-control ap-input"
                    style={{ backgroundColor: '#e9ecef', marginBottom: 0 }}
                  >
                    {originalData?.rol || 'No role'}
                  </p>
                </div>

                <div className="col-12">
                  <label className="form-label ap-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ap-input ${errors.password ? 'is-invalid' : ''}`}
                      {...register('password', {
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                      disabled={!isEditing}
                      placeholder="Leave blank to keep current password"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileEmployee;
