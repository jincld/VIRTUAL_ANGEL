import React, { useEffect, useRef, useState } from 'react';
import './addEmployee.css'; // usa el mismo CSS con clases adaptadas
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AddEmployee = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    id: '',
    imagen: '',
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    rol: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setForm({
      id: '',
      imagen: '',
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      rol: '',
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
    console.log('Empleado guardado:', form);
    alert('Empleado guardado en consola.');
  };

  return (
    <>
      <div className="backaddemployee"></div>
                              <div className="btn-marginpd margin-top-global">

            <Link to={"/employee"} className="ap-btn-back">← BACK </Link>
          </div>
      <div className="ap-wrapper">
        <h2 className="text-center text-black mb-4 addemployee-title">ADD NEW EMPLOYEE</h2>
        <div className="ap-card rounded p-4 shadow">
          <div className="row g-4">
            {/* Columna de imagen */}
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
              <button className="btn ap-btn-save w-100 btnsaveemployee" onClick={handleSave}>Save Employee</button>
            </div>

            {/* Columna de formulario */}
            <div className="col-md-7">
              <form className="row g-3">
                <div className="col-6">
                  <label className="form-label ap-label">ID</label>
                  <input
                    type="text"
                    className="form-control ap-input"
                    name="id"
                    value={form.id}
                    onChange={handleChange}
                    placeholder="Unique ID"
                  />
                </div>
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
                  <label className="form-label ap-label">Age</label>
                  <input
                    type="number"
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
                    <option value="">Select</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label ap-label">Role</label>
                  <select
                    className="form-select ap-input"
                    name="rol"
                    value={form.rol}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
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

export default AddEmployee;
