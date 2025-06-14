import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import './EditProduct.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EditProduct = () => {
  const { id } = useParams(); // obtener id desde la url
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    _id: '',
    imagen: '',
    titulo: '',
    precio: '',
    coleccion: '',
    color: '',
    colorcode: '#000000',
    stock: '',
    categoria: '',
  });

useEffect(() => {
  AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  
  console.log('Fetching product with id:', id);
  
  async function fetchProduct() {
    try {
const res = await fetch(`http://localhost:3001/api/product/${id}`, {
  credentials: 'include'
});

      console.log('Fetch response status:', res.status);
      if (!res.ok) throw new Error('Producto no encontrado');
      const data = await res.json();
      console.log('Fetched product data:', data);

      setForm({
        _id: data._id,
        imagen: data.image,
        titulo: data.name,
        precio: data.price,
        coleccion: data.coleccion,
        color: data.color,
        colorcode: data.colorcode || '#000000',
        stock: data.stock,
        categoria: data.category,
      });
    } catch (error) {
      console.error(error);
      alert('Error al cargar el producto');
      navigate('/products');
    }
  }

  fetchProduct();
}, [id, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setForm({
      _id: '',
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
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload an image with jpg, jpeg or png format.');
      e.target.value = null;  // limpiar input
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, imagen: reader.result }));
    };
    reader.readAsDataURL(file);
  }
};


  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/product/${form._id}`, {
        method: 'DELETE',
        credentials: 'include', // para que envíe cookies junto con la petición
      });

      if (!response.ok) throw new Error('Error deleting product');

      alert('Producto eliminado correctamente');
      navigate('/products');
    } catch (error) {
      console.error('Error eliminando producto:', error);
      alert('Error al eliminar producto');
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('titulo', form.titulo);
      formData.append('coleccion', form.coleccion);
      formData.append('categoria', form.categoria);
      formData.append('precio', form.precio);
      formData.append('stock', form.stock);
      formData.append('color', form.color);
      formData.append('colorcode', form.colorcode);

      if (fileInputRef.current.files[0]) {
        formData.append('imagen', fileInputRef.current.files[0]);
      }

      const response = await fetch(`http://localhost:3001/api/product/${form._id}`, {
        method: 'PUT',
        credentials: 'include', // para que envíe cookies junto con la petición
        body: formData,
      });

      if (!response.ok) throw new Error('Error al actualizar producto');

      alert('Producto actualizado correctamente');
      navigate('/products');
    } catch (error) {
      console.error('Error actualizando producto:', error);
      alert('Error al actualizar producto');
    }
  };

  return (
    <>
      <div className="backeditproduct"></div>
      <div className="btn-marginpd margin-top-global">
        <Link to="/products" className="ap-btn-back">← BACK</Link>
      </div>
      <div className="ap-wrapper">
        <h2 className="text-center text-black mb-4 addproduct-title">EDIT PRODUCT</h2>
        <div className="ap-card rounded p-4 shadow">
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
              <button className="btn ap-btn-save w-100 btnsaveitem" onClick={handleDelete}>Delete item</button>
              <button className="btn ap-btn-save w-100 btnsaveitem" onClick={handleSave}>Save Changes</button>
            </div>

            {/* Columna 2 - Formulario */}
            <div className="col-md-7">
              <form className="row g-3">
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
                  <label className="form-label ap-label">Price</label>
                  <input
                    type="text"
                    className="form-control ap-input"
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                  />
                </div>

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

                <div className="col-6">
                  <label className="form-label ap-label">Stock</label>
                  <input
                    type="text"
                    className="form-control ap-input"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
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
    </>
  );
};

export default EditProduct;

