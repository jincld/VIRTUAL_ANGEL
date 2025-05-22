import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';  // Importar react-hook-form
import './AddProduct.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AddProduct = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // Para redirigir al usuario después de guardar el producto

  // React Hook Form
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [form, setForm] = useState({
    imagen: '',
    titulo: '',
    precio: '',
    coleccion: '',
    color: '',
    colorcode: '#000000',
    stock: '',
    categoria: '',
  });

  // Lógica para manejar los cambios de formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Función para manejar la carga de imágenes
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

  // Función para guardar el producto
const onSubmit = async (data) => {
  if (!form.imagen) {
    alert("Please upload an image.");
    return;
  }

  const payload = {
    name: data.titulo,
    description: data.coleccion,
    idCategory: data.categoria,
    sizes: data.sizes || "",
    prices: parseFloat(data.precio),
    stock: parseInt(data.stock),
    image: form.imagen,
    color: data.color,
  };

  console.log("🟢 Enviando al backend:", payload);

try {
  const response = await fetch('http://localhost:3001/api/product', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // 🔥 ESTO ES CLAVE
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    alert('Product saved successfully');
    navigate('/products');
  } else {
    const errorData = await response.json();
    alert('Failed to save product: ' + (errorData.message || 'Unknown error'));
  }
} catch (error) {
  console.error('Error:', error);
  alert('There was an error saving the product.');
}
}


  return (
    <>
      <div className="backaddproduct"></div>
      <div className="btn-marginpd margin-top-global">
        <Link to={"/products"} className="ap-btn-back">← BACK</Link>
      </div>
      <div className="ap-wrapper">
        <h2 className="text-center text-black mb-4 addproduct-title">ADD NEW PRODUCT</h2>
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
                <button className="btn ap-btn-clear w-50" onClick={() => reset()}>Clear Form</button>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Columna 2 - Formulario */}
            <div className="col-md-7">
              <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

                {/* Price */}
                <div className="col-6">
                  <label className="form-label ap-label">Price</label>
                  <input
                    type="number"
                    className="form-control ap-input"
                    {...register('precio', { required: 'Price is required' })}
                  />
                  {errors.precio && <span>{errors.precio.message}</span>}
                </div>

                {/* Title */}
                <div className="col-6">
                  <label className="form-label ap-label">Item Name</label>
                  <input
                    type="text"
                    className="form-control ap-input"
                    {...register('titulo', { required: 'Title is required' })}
                  />
                  {errors.titulo && <span>{errors.titulo.message}</span>}
                </div>

                {/* Collection */}
                <div className="col-6">
                  <label className="form-label ap-label">Collection</label>
                  <input
                    type="text"
                    className="form-control ap-input"
                    {...register('coleccion', { required: 'Collection is required' })}
                  />
                  {errors.coleccion && <span>{errors.coleccion.message}</span>}
                </div>

                {/* Color Name */}
                <div className="col-6">
                  <label className="form-label ap-label">Color Name</label>
                  <input
                    type="text"
                    className="form-control ap-input"
                    {...register('color', { required: 'Color is required' })}
                  />
                  {errors.color && <span>{errors.color.message}</span>}
                </div>

                {/* Color Picker */}
                <div className="col-6 d-flex align-items-center">
                  <label className="form-label ap-label me-2">Color Code</label>
                  <input
                    type="color"
                    className="form-control ap-input me-2"
                    {...register('colorcode')}
                    style={{ width: '40px', height: '40px', border: 'none' }}
                  />
                  <input
                    type="text"
                    className="form-control ap-input"
                    value={form.colorcode}
                    onChange={handleChange}
                    name="colorcode"
                    placeholder="#000000"
                    style={{ width: '100px' }}
                  />
                </div>

                {/* Stock */}
                <div className="col-6">
                  <label className="form-label ap-label">Stock</label>
                  <input
                    type="number"
                    className="form-control ap-input"
                    {...register('stock', { required: 'Stock is required' })}
                  />
                  {errors.stock && <span>{errors.stock.message}</span>}
                </div>

                {/* Category */}
                <div className="col-6">
                  <label className="form-label ap-label">Category</label>
                  <select
  className="form-select ap-input"
  {...register('categoria', { required: 'Category is required' })}
>
  <option value="67ab7de2ff6f480345a0e9f3">Shirts</option>
  <option value="67ab7e1aff6f480345a0e9f4">Pants</option>
  <option value="67ab7eb7ff6f480345a0e9f6">Jackets</option>
  <option value="67ab7f0bff6f480345a0e9f7">Sweaters</option>
</select>

                  {errors.categoria && <span>{errors.categoria.message}</span>}
                </div>

                {/* Submit Button */}
                <div className="col-12">
                  <button type="submit" className="btn ap-btn-save w-100 btnsaveitem">Save Item</button>
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
