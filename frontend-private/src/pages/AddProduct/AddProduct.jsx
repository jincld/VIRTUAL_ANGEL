import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './AddProduct.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AddProduct = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [colorcode, setColorcode] = useState('#000000');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Manejar cambios en imagen
  const handleUpload = () => {
    fileInputRef.current.click();
  };

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Validar tipo de imagen permitido
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload an image with jpg, jpeg or png format.');
      // Limpiar input y estado de imagen
      e.target.value = null;
      setImageFile(null);
      setPreviewImage(null);
      return;
    }

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  }
};


  // Submit del formulario
  const onSubmit = async (data) => {
    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    const payload = new FormData();
    payload.append('titulo', data.titulo);
    payload.append('coleccion', data.coleccion);
    payload.append('categoria', data.categoria);
    payload.append('precio', parseFloat(data.precio));
    payload.append('stock', parseInt(data.stock));
    payload.append('color', data.color);
    payload.append('colorcode', colorcode);
    payload.append('imagen', imageFile);

    try {
      const response = await fetch('http://localhost:3001/api/product', {
        method: 'POST',
        credentials: 'include',
        body: payload,
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
  };

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
            {/* Imagen */}
            <div className="col-md-5 text-center d-flex flex-column align-items-center justify-content-start">
              <div className="mb-3 w-100">
                <img
                  src={previewImage || '/holder-newitem.png'}
                  alt="Preview"
                  className="img-fluid ap-img-preview"
                />
              </div>
              <div className="d-flex gap-2 mb-3 w-100 justify-content-center">
                <button className="btn ap-btn-upload w-50 btnupload-image" onClick={handleUpload}>Upload Image</button>
                <button className="btn ap-btn-clear w-50" onClick={() => {
                  reset();
                  setPreviewImage(null);
                  setImageFile(null);
                  setColorcode('#000000');
                }}>Clear Form</button>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Formulario */}
            <div className="col-md-7">
              <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

                <div className="col-6">
                  <label className="form-label ap-label">Price</label>
                  <input type="number" className="form-control ap-input" {...register('precio', { required: 'Price is required' })} />
                  {errors.precio && <span>{errors.precio.message}</span>}
                </div>

                <div className="col-6">
                  <label className="form-label ap-label">Item Name</label>
                  <input type="text" className="form-control ap-input" {...register('titulo', { required: 'Title is required' })} />
                  {errors.titulo && <span>{errors.titulo.message}</span>}
                </div>

                <div className="col-6">
                  <label className="form-label ap-label">Collection</label>
                  <input type="text" className="form-control ap-input" {...register('coleccion', { required: 'Collection is required' })} />
                  {errors.coleccion && <span>{errors.coleccion.message}</span>}
                </div>

                <div className="col-6">
                  <label className="form-label ap-label">Color Name</label>
                  <input type="text" className="form-control ap-input" {...register('color', { required: 'Color is required' })} />
                  {errors.color && <span>{errors.color.message}</span>}
                </div>

                <div className="col-6 d-flex align-items-center">
                  <label className="form-label ap-label me-2">Color Code</label>
                  <input
                    type="color"
                    className="form-control ap-input me-2"
                    value={colorcode}
                    onChange={(e) => setColorcode(e.target.value)}
                    style={{ width: '40px', height: '40px', border: 'none' }}
                  />
                  <input
                    type="text"
                    className="form-control ap-input"
                    value={colorcode}
                    onChange={(e) => setColorcode(e.target.value)}
                    placeholder="#000000"
                    style={{ width: '100px' }}
                  />
                </div>

                <div className="col-6">
                  <label className="form-label ap-label">Stock</label>
                  <input type="number" className="form-control ap-input" {...register('stock', { required: 'Stock is required' })} />
                  {errors.stock && <span>{errors.stock.message}</span>}
                </div>

                <div className="col-6">
                  <label className="form-label ap-label">Category</label>
                  <select className="form-select ap-input" {...register('categoria', { required: 'Category is required' })}>
                    <option value="Shirts">Shirts</option>
                    <option value="Pants">Pants</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Sweaters">Sweaters</option>
                  </select>
                  {errors.categoria && <span>{errors.categoria.message}</span>}
                </div>

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
