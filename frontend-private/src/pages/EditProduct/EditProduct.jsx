import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditProduct.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    id: '',
    imagen: '',
    titulo: '',
    precio: '',
    coleccion: '',
    color: '',
    colorcode: '#000000',
    stock: '',
    categoria: '',
  });

  // Cargar data desde location.state cuando el componente se monta
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  useEffect(() => {
    if (!location.state) {
      // Si no hay datos en location.state, redirigir o mostrar mensaje de error
      alert('No product data found to edit!');
      navigate('/products'); // Redirigir a la página de productos si no hay datos
      return;
    }

    // Verifica que los datos recibidos están correctamente en location.state
    const { 
      id, imagen, titulo, precio, coleccion, color, colorcode, stock, categoria 
    } = location.state;

    console.log("Datos recibidos en EditProduct:", location.state); // Imprime en consola para depurar

    // Normaliza el valor de categoria para que coincida con el formato de las opciones del select
    const normalizedCategory = categoria ? categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase() : '';

    setForm({
      id, 
      imagen, 
      titulo, 
      precio, 
      coleccion, 
      color, 
      colorcode, 
      stock, 
      categoria: normalizedCategory
    });
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setForm({
      imagen: '',
      titulo: '',
      precio: '',
      coleccion: '',
      color: '',
      colorcode: '#000000',
      stock: '',
      categoria: '',
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
    if (!form.titulo || !form.precio || !form.stock || !form.categoria) {
      alert('Please fill all required fields');
      return;
    }

    if (isNaN(form.precio) || isNaN(form.stock)) {
      alert('Price and stock must be numeric values');
      return;
    }

    console.log('Producto guardado:', form); 
    alert('Producto guardado en consola.');
  };

  return (
    <>
      <div className="backeditproduct"></div>
      <div className="white-wallpaper">
        <div className="ep-wrapper">
          <div className="btn btn-marginpd">
            <a href="/products" className="ep-btn-back"> ← BACK </a>
          </div>

          <h2 className="text-center text-black mb-4 editproduct-title">EDIT PRODUCT</h2>
          <div className="ep-card container rounded p-4 shadow">
            <div className="row g-4">
              <div className="col-md-5 text-center d-flex flex-column align-items-center justify-content-start">
                <div className="mb-3 w-100">
                  <img
                    src={form.imagen || '/holder-newitem.png'}
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
                <button className="btn ep-btn-save w-100 btnsaveitem" onClick={handleSave}>Save Item</button>
              </div>

              <div className="col-md-7">
                <form className="row g-3">
                  <div className="col-6">
                    <label className="form-label ep-label">ID</label>
                    <input
                      type="text"
                      className="form-control ep-input"
                      name="id"
                      value={form.id}
                      onChange={handleChange}
                      placeholder="Start ID with SH, P, J or SW"
                      readOnly
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label ep-label">Price</label>
                    <input
                      type="text"
                      className="form-control ep-input"
                      name="precio"
                      value={form.precio}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label ep-label">Item Name</label>
                    <input
                      type="text"
                      className="form-control ep-input"
                      name="titulo"
                      value={form.titulo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label ep-label">Collection</label>
                    <input
                      type="text"
                      className="form-control ep-input"
                      name="coleccion"
                      value={form.coleccion}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label ep-label">Color Name</label>
                    <input
                      type="text"
                      className="form-control ep-input"
                      name="color"
                      value={form.color}
                      onChange={handleChange}
                      placeholder="Name in lowercase"
                    />
                  </div>

                  <div className="col-6 d-flex align-items-center">
                    <label className="form-label ep-label me-2">Color Code</label>
                    <input
                      type="color"
                      className="form-control ep-input me-2"
                      name="colorcode"
                      value={form.colorcode}
                      onChange={handleChange}
                      style={{ width: '40px', height: '40px', border: 'none' }}
                    />
                    <input
                      type="text"
                      className="form-control ep-input"
                      name="colorcode"
                      value={form.colorcode}
                      onChange={handleChange}
                      placeholder="#000000"
                      style={{ width: '100px' }}
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label ep-label">Stock</label>
                    <input
                      type="text"
                      className="form-control ep-input"
                      name="stock"
                      value={form.stock}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label ep-label">Category</label>
                    <select
                      className="form-select ep-input"
                      name="categoria"
                      value={form.categoria}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Shirts">Shirts</option>
                      <option value="Pants">Pants</option>
                      <option value="Jackets">Jackets</option>
                      <option value="Sweaters">Sweaters</option>
                    </select>
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

export default EditProduct;
