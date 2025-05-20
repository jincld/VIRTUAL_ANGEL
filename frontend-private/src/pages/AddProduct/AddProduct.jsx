import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AddProduct.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AddProduct = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

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

  // Aquí deberías traer las categorías reales con sus ids si tienes API para eso.
  // Por ahora pongo un arreglo estático con ids ficticios:
  const categories = [
    { _id: '644e3e2f1234567890abcdef', name: 'Shirts' },
    { _id: '644e3e2f1234567890abcdea', name: 'Pants' },
    { _id: '644e3e2f1234567890abcdeb', name: 'Jackets' },
    { _id: '644e3e2f1234567890abcdec', name: 'Sweaters' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setForm({
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
    if (fileInputRef.current) fileInputRef.current.value = null; // limpiar input file
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

  const handleSave = async () => {
    try {
      // Validar campos básicos
      if (!form.titulo || !form.coleccion || !form.categoria || !form.precio || !form.stock || !form.color) {
        alert("Por favor completa todos los campos requeridos.");
        return;
      }
      if (!fileInputRef.current.files[0]) {
        alert("Por favor sube una imagen.");
        return;
      }

      const formData = new FormData();
      formData.append("name", form.titulo);
      formData.append("description", form.coleccion);
      formData.append("idCategory", form.categoria); // debe ser el ID
      formData.append("prices", form.precio);
      formData.append("stock", form.stock);
      formData.append("color", form.color);
      formData.append("image", fileInputRef.current.files[0]);

      const res = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error saving product: ${errorData.message}`);
        return;
      }

      const data = await res.json();
      alert("Product saved successfully!");
      handleClear();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product");
    }
  };

  return (
    <>
      <div className="backaddproduct"></div>
      <div className="btn-marginpd margin-top-global">
        <Link to={"/products"} className="ap-btn-back">← BACK</Link>
      </div>
      <div className="ap-wrapper">
        <h2 className="text-center text-black mb-4 addproduct-title">ADD NEW PRODUCT</h2>
        <div className="ap-card  rounded p-4 shadow">
          <div className="row g-4">
            {/* Columna 1 */}
            <div className="col-md-5 text-center d-flex flex-column align-items-center justify-content-start">
              <div className="mb-3 w-100">
                <img
                  src={form.imagen || '/holder-newitem.png'}
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
              <button className="btn ap-btn-save w-100 btnsaveitem" onClick={handleSave}>Save Item</button>
            </div>

            {/* Columna 2 - Formulario */}
            <div className="col-md-7">
              <form className="row g-3" onSubmit={e => e.preventDefault()}>
                {/* Primera fila de campos */}
                <div className="col-6">
                  <label className="form-label ap-label">ID</label>
                  <input
                    type="text"
                    className="form-control ap-input"
                    name="id"
                    value={form.id}
                    onChange={handleChange}
                    placeholder="Start ID with SH, P, J or SW"
                    disabled
                  />
                </div>
                <div className="col-6">
                  <label className="form-label ap-label">Price</label>
                  <input
                    type="number"
                    className="form-control ap-input"
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Segunda fila de campos */}
                <div className="col-6">
                  <label className="form-label ap-label">Item Name</label>
                  <input
                    type="text"
                    className="form-control ap-input"
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label ap-label">Collection</label>
                  <input
                    type="text"
                    className="form-control ap-input"
                    name="coleccion"
                    value={form.coleccion}
                    onChange={handleChange}
                  />
                </div>

                {/* Tercera fila de campos */}
                <div className="col-6">
                  <label className="form-label ap-label">Color Name</label>
                  <input
                    type="text"
                    className="form-control ap-input"
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    placeholder="Name in lowercase"
                  />
                </div>

                {/* Color Picker con cuadro de color */}
                <div className="col-6 d-flex align-items-center">
                  <label className="form-label ap-label me-2">Color Code</label>
                  <input
                    type="color"
                    className="form-control ap-input me-2"
                    name="colorcode"
                    value={form.colorcode}
                    onChange={handleChange}
                    style={{ width: '40px', height: '40px', border: 'none' }}
                  />
                  <input
                    type="text"
                    className="form-control ap-input"
                    name="colorcode"
                    value={form.colorcode}
                    onChange={handleChange}
                    placeholder="#000000"
                    style={{ width: '100px' }}
                  />
                </div>

                {/* Última fila de campos */}
                <div className="col-6">
                  <label className="form-label ap-label">Stock</label>
                  <input
                    type="number"
                    className="form-control ap-input"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    min="0"
                    step="1"
                  />
                </div>
                <div className="col-6">
                  <label className="form-label ap-label">Category</label>
                  <select
                    className="form-select ap-input"
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
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

export default AddProduct;

