import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './addEmployee.css'; // Usamos el MISMO CSS
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
      <div className="backaddemployee"></div>
                                    <div className="btn-marginpd">
            <a href="/employee" className="ap-btn-back"> ← BACK </a>
          </div>
      <div className="ap-wrapper">
        <button className="ep-btn-back" onClick={() => navigate(-1)}>← Back</button>
        <h2 className="text-center text-black mb-4 addemployee-title">EDIT EMPLOYEE</h2>
        <div className="ap-card container rounded p-4 shadow">
          <div className="row g-4">
            <div className="col-md-5 text-center d-flex flex-column align-items-center justify-content-start">
              <div className="mb-3 w-100">
                <img
                  src={form.imagen || '/holder-newemployee.png'}
                  alt="Preview"
                  className="img-fluid ap-img-preview"
                />
              </div>
              <div className="d-flex gap-2 mb-3 w-100 justify-content-center">
                <button className="btn ap-btn-upload w-50 btnupload-image" onClick={handleUpload}>Upload Image</button>
                <button className="btn ap-btn-clear w-50" onClick={handleClear}>Clear Form</button>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              <button className="btn ap-btn-save w-100 btnsaveemployee" onClick={handleSave}>Save Changes</button>
            </div>

            <div className="col-md-7">
              <form className="row g-3">
                <div className="col-6">
                  <label className="form-label ap-label">Name</label>
                  <input
                    type="text"
                    className="form-control ap-input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label ap-label">Age</label>
                  <input
                    type="text"
                    className="form-control ap-input"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label ap-label">Gender</label>
                  <select
                    className="form-select ap-input"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label ap-label">Phone</label>
                  <input
                    type="text"
                    className="form-control ap-input"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label ap-label">Email</label>
                  <input
                    type="email"
                    className="form-control ap-input"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label ap-label">Role</label>
                  <select
                    className="form-select ap-input"
                    name="rol"
                    value={form.rol}
                    onChange={handleChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Employee">Employee</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmployee;
