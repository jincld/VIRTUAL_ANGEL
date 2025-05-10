import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditEmployee.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EditEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    id: '',
    imagen: '',
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    rol: ''
  });

  // Inicialización de animaciones y carga de datos del state
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  useEffect(() => {
    if (!location.state) {
      alert('No employee data found to edit!');
      navigate('/employees');
      return;
    }

    const { id, imagen, name, age, gender, phone, email, rol } = location.state;
    setForm({ id, imagen, name, age, gender, phone, email, rol });
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setForm({
      id: '',
      imagen: '',
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      rol: ''
    });
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, imagen: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Employee updated:', form);
    alert('Employee data saved in the console.');
    navigate('/employees');
  };

  return (
    <>
    <div className="backeditemployee"></div>
      <div className="white-wallpaper">
        <div className="ep-wrapper">
          <div className="btn btn-marginpd">
          <button className="ep-btn-back" onClick={() => navigate('/employee')}>← BACK</button>
          </div>

          <h2 className="text-center text-black mb-4 editproduct-title">EDIT EMPLOYEE</h2>
          <div className="ep-card container rounded p-4 shadow">
            <div className="row g-4">
              <div className="col-md-5 text-center d-flex flex-column align-items-center justify-content-start">
                <div className="mb-3 w-100">
                  <img
                    src={form.imagen || '/holder-newemployee.png'}
                    alt="Preview"
                    className="img-fluid ep-img-preview"
                  />
                </div>

                <div className="d-flex gap-2 mb-3 w-100 justify-content-center">
                  <button className="btn ep-btn-upload w-50 btnupload-image" onClick={handleUpload}>Upload Image</button>
                  <button className="btn ep-btn-clear w-50" onClick={handleClear}>Clear Form</button>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
                <button className="btn ep-btn-save w-100 btnsaveitem" onClick={handleSave}>Save Employee</button>
              </div>

              <div className="col-md-7">
                <form className="row g-3">
                  <div className="col-6">
                    <label className="form-label ep-label">Name</label>
                    <input
                      type="text"
                      className="form-control ep-input"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label ep-label">Age</label>
                    <input
                      type="text"
                      className="form-control ep-input"
                      name="age"
                      value={form.age}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label ep-label">Gender</label>
                    <input
                      type="text"
                      className="form-control ep-input"
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label ep-label">Phone</label>
                    <input
                      type="text"
                      className="form-control ep-input"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label ep-label">Email</label>
                    <input
                      type="email"
                      className="form-control ep-input"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label ep-label">Role</label>
                    <input
                      type="text"
                      className="form-control ep-input"
                      name="rol"
                      value={form.rol}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
</>
  );
};

export default EditEmployee;