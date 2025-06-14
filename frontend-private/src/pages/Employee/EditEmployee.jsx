import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './addEmployee.css'; // We use the same CSS you have
import AOS from 'aos';
import 'aos/dist/aos.css';

const EditEmployee = () => {
  const { id } = useParams(); // Get id from URL
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

const [form, setForm] = useState({
  _id: '',
  image: '',
  name: '',
  age: '',
  gender: '',
  phone: '',
  email: '',
  role: '',
  password: '', 
});


  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });

    async function fetchEmployee() {
      try {
        const res = await fetch(`http://localhost:3001/api/employee/${id}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Employee not found');
        const data = await res.json();

setForm({
  _id: data._id,
  image: data.imagen || '',
  name: data.name || '',
  age: data.age || '',
  gender: data.gender || 'Female',
  phone: data.phone || '',
  email: data.email || '',
  role: data.rol || 'Employee',
  password: '', // Nunca mostrar la contraseña actual
});

      } catch (error) {
        alert('Error loading employee');
        navigate('/employees');
      }
    }

    if (id) fetchEmployee();
    else {
      alert('No employee ID provided');
      navigate('/employees');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setForm({
      _id: '',
      image: '',
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      role: '',
    });
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Validar tipo MIME: solo imágenes PNG, JPEG, JPG, GIF
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid image (PNG, JPEG or JPG)');
      e.target.value = ''; // Limpiar input
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }
};


  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/employee/${form._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Error deleting employee');

      alert('Employee deleted successfully');
      navigate('/employee');
    } catch (error) {
      alert('Error deleting employee');
    }
  };

const handleSave = async () => {
  try {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('age', form.age);
    formData.append('gender', form.gender);
    formData.append('phone', form.phone);
    formData.append('email', form.email);
    formData.append('rol', form.role);

    // Solo enviar imagen si hay archivo nuevo
    if (fileInputRef.current.files[0]) {
      formData.append('imagen', fileInputRef.current.files[0]);
    }

    // Enviar contraseña solo si no está vacía
    if (form.password && form.password.trim() !== '') {
      formData.append('password', form.password.trim());
    }

    const response = await fetch(`http://localhost:3001/api/employee/${form._id}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) throw new Error('Error updating employee');

    alert('Employee updated successfully');
    navigate('/employee');
  } catch (error) {
    alert('Error updating employee');
  }
};


  return (
    <>
      <div className="backaddemployee"></div>
      <div className="btn-marginpd margin-top-global">
        <Link to="/employee" className="ap-btn-back">← BACK</Link>
      </div>
      <div className="ap-wrapper">
        <h2 className="text-center text-black mb-4 addemployee-title">EDIT EMPLOYEE</h2>
        <div className="ap-card rounded p-4 shadow">
          <div className="row g-4">
            {/* Left column - Image and buttons */}
            <div className="col-md-5 text-center d-flex flex-column align-items-center justify-content-start">
              <div className="mb-3 w-100">
                <img
                  src={form.image || '/holder-newemployee.png'}
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
              <button className="btn ap-btn-save w-100 btnsaveemployee mb-2" onClick={handleDelete}>Delete Employee</button>
              <button className="btn ap-btn-save w-100 btnsaveemployee" onClick={handleSave}>Save Changes</button>
            </div>

            {/* Right column - Form */}
            <div className="col-md-7">
              <form className="row g-3" onSubmit={e => e.preventDefault()}>
                <div className="col-6">
                  <label className="form-label ap-label">ID (MongoDB)</label>
                  <input
                    type="text"
                    className="form-control ap-input idinput"
                    name="_id"
                    value={form._id}
                    disabled
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
                  <label className="form-label ap-label">Age</label>
                  <input
                    type="number"
                    className="form-control ap-input"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    min={0}
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
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label ap-label">Phone</label>
                  <input
                    type="tel"
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
  <label className="form-label ap-label">Password</label>
  <input
    type="password"
    className="form-control ap-input"
    name="password"
    value={form.password}
    onChange={handleChange}
    placeholder="Leave blank to keep current"
  />
</div>

                <div className="col-6">
                  <label className="form-label ap-label">Role</label>
                  <select
                    className="form-select ap-input"
                    name="role"
                    value={form.role}
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

