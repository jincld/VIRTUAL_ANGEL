import React, { useEffect, useState } from 'react';
import './ProfileClient.css';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from 'react-hook-form';

const ProfileClient = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
    fetchUserData();
  }, []);

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
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

      const resUser = await fetch(`http://localhost:3001/api/clients/${meData.userId}`, {
        credentials: 'include',
      });
      if (!resUser.ok) {
        alert('Could not load user data');
        return;
      }
      const userData = await resUser.json();

      setUserId(userData._id);

      const dataForForm = {
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        age: userData.age || '',
        gender: userData.gender || '',
        password: '', // no cargamos password en claro
        imagen: '/static-image.png', // Imagen estática en lugar de una carga dinámica
      };
      setOriginalData(dataForForm);

      reset(dataForForm);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleCancelEdit = () => {
    if (originalData) {
      reset(originalData);
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
      !data.password;  // Aquí comprobamos si la contraseña está vacía
  
    // Si no hay cambios, no enviamos nada
    if (noChanges) {
      return;
    }
  
    // Si la contraseña está vacía, la eliminamos de los datos a enviar
    if (!data.password) {
      delete data.password;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/api/clients/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const resData = await response.json();
  
      if (response.ok) {
        alert(resData.message || 'Profile updated successfully');
        fetchUserData();
        setIsEditing(false);
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
      <div className="profile-client-background"></div>
      <div className="btn-margin-top"></div>
      <div className="profile-wrapper">
        <h2 className="text-center text-white profile-title">
          PROFILE
        </h2>
        <div className="profile-card rounded p-4 shadow">
          <form className="row g-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Imagen Estática */}
            <div className="col-md-5 text-center d-flex flex-column align-items-center justify-content-start">
              <div className="mb-3 w-100">
                <img
                  src="/profileclient-ad.png" // Imagen estática
                  alt="Profile"
                  className="img-fluid profile-img-preview"
                />
              </div>

            </div>

            {/* Formulario */}
            <div className="col-md-7">
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label profile-label">Name</label>
                  <input
                    type="text"
                    className={`form-control profile-input ${errors.name ? 'is-invalid' : ''}`}
                    {...register('name', { required: 'Name is required' })}
                    disabled={!isEditing}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                <div className="col-6">
                  <label className="form-label profile-label">Email</label>
                  <input
                    type="email"
                    className={`form-control profile-input ${errors.email ? 'is-invalid' : ''}`}
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
  <label className="form-label profile-label">Age</label>
  <input
    type="number"
    className={`form-control profile-input ${errors.age ? 'is-invalid' : ''}`}
    {...register('age', {
      required: 'Age is required',
      min: { value: 18, message: 'You must be at least 18 years old' },
    })}
    disabled={!isEditing}
  />
  {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
</div>


                                <div className="col-6">
                  <label className="form-label profile-label">Phone</label>
                  <input
                    type="text"
                    className={`form-control profile-input ${errors.phone ? 'is-invalid' : ''}`}
                    {...register('phone', { required: 'Phone is required' })}
                    disabled={!isEditing}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                </div>

                <div className="col-6">
                  <label className="form-label profile-label">Gender</label>
                  <select
                    className={`form-select profile-input ${errors.gender ? 'is-invalid' : ''}`}
                    {...register('gender', { required: 'Gender is required' })}
                    disabled={!isEditing}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
                </div>

<div className="col-6">
  <label className="form-label profile-label">Password</label>
  <div className="input-group">
    <input
      type={showPassword ? 'text' : 'password'}
      className={`form-control profile-input ${errors.password ? 'is-invalid' : ''}`}
      {...register('password', {
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters',
        },
      })}
      disabled={!isEditing}
      placeholder="Leave blank to keep current"
    />
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() => setShowPassword(!showPassword)}
      tabIndex={-1}
      disabled={!isEditing} // opcional: deshabilitar botón si no está editando
    >
      {showPassword ? 'Hide' : 'Show'}
    </button>
  </div>
  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
</div>

                <div className="d-flex gap-2 mb-3 w-100 justify-content-center">
                {!isEditing ? (
                  <>
                    <button
                      type="button"
                      className="btn profile-btn-save w-100 profile-btn-edit"
                      onClick={() => setIsEditing(true)}
                    >
                      EDIT PROFILE
                    </button>

                    <button type="button" className="btn profile-btn-logout w-100" onClick={handleLogout}>
                      LOGOUT
                    </button>
                  </>
                ) : (
                  <>
                    <button type="submit" className="btn profile-btn-save w-100">
                      SAVE CHANGES
                    </button>
                    <button type="button" className="btn profile-btn-save w-100" onClick={handleCancelEdit}>
                      CANCEL EDIT
                    </button>
                  </>
                )}
              </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileClient;
