import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Products.css';
import AOS from 'aos';
import { NavLink } from 'react-router-dom';
import 'aos/dist/aos.css';
import CardClothing from '../../components/cardClothing/CardClothing.jsx';

import shirtsData from '../../../../frontend-public/src/pages/shirts/ShirtsData.jsx';
import pantsData from '../../../../frontend-public/src/pages/pants/PantsData.jsx';
import jacketsData from '../../../../frontend-public/src/pages/jackets/JacketsData.jsx';
import sweatersData from '../../../../frontend-public/src/pages/sweaters/SweatersData.jsx';

const Products = () => {
  const navigate = useNavigate(); // Crear una instancia de useNavigate
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collectionFilter, setCollectionFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [maxPrice, setMaxPrice] = useState(200);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  const toggleFilters = () => setShowFilters(!showFilters);

  const clearFilters = () => {
    setQuery('');
    setCollectionFilter('');
    setColorFilter('');
    setCategoryFilter('');
    setSortOrder('');
    setMaxPrice(200);
  };

  const allClothingData = [
    ...shirtsData.map(item => ({ ...item, category: 'shirts' })),
    ...pantsData.map(item => ({ ...item, category: 'pants' })),
    ...jacketsData.map(item => ({ ...item, category: 'jackets' })),
    ...sweatersData.map(item => ({ ...item, category: 'sweaters' })),
  ];

  const filteredClothes = allClothingData
    .filter(item => {
      const matchSearch =
        item.titulo.toLowerCase().includes(query.toLowerCase()) ||
        item.coleccion?.toLowerCase().includes(query.toLowerCase()) ||
        item.color?.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase()) ||
        (!isNaN(query) && Math.abs(item.precio - parseFloat(query)) < 5);

      const matchFilters =
        (collectionFilter ? item.coleccion === collectionFilter : true) &&
        (colorFilter ? item.color === colorFilter : true) &&
        (categoryFilter ? item.category === categoryFilter : true) &&
        item.precio <= maxPrice;

      return matchSearch && matchFilters;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.precio - b.precio;
      if (sortOrder === 'desc') return b.precio - a.precio;
      return 0;
    });

  return (
    <>
      <div className="backproducts"></div>
      <div className="container content-zone py-5">
        <div className="title-wrapper text-center">
          <h1 className="shirtstitle">
            {categoryFilter ? categoryFilter.toUpperCase() : 'ALL PRODUCTS'}
          </h1>
        </div>

        {/* Barra de búsqueda */}
        <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
          <input
            type="text"
            placeholder="Search for items..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input form-control input-style"
            style={{ maxWidth: '400px' }}
          />
          <button className="btn btnfilters" onClick={toggleFilters}>
            {showFilters ? 'Hide filters' : 'Show filters'}
          </button>
          <div>
            <a href="/addproduct" className="btn btn-addproducts"> + Add products</a>
          </div>
        </div>

        {showFilters && (
          <div className="filter-menu p-4 mt-3 rounded shadow-sm">
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">Category:</label>
                <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="">All</option>
                  <option value="shirts">Shirts</option>
                  <option value="pants">Pants</option>
                  <option value="jackets">Jackets</option>
                  <option value="sweaters">Sweaters</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Collection:</label>
                <select className="form-select" value={collectionFilter} onChange={(e) => setCollectionFilter(e.target.value)}>
                  <option value="">All</option>
                  <option value="ANGEL OR CRAZY">ANGEL OR CRAZY</option>
                  <option value="This Is Eclipse">This Is Eclipse</option>
                  <option value="GOOD BOY GONE BAD">GOOD BOY GONE BAD</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Color:</label>
                <select className="form-select" value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
                  <option value="">All</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="gray">Gray</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="brown">Brown</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Sort by price:</label>
                <select className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="">No order</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>

            <div className="row mt-3 align-items-center">
              <div className="col-md-9">
                <label className="form-label">Max. price: ${maxPrice}</label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="200"
                  step="1"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                />
              </div>
              <div className="col-md-3 text-end">
                <button className="btn btn-limpiar" onClick={clearFilters}>Clear filters</button>
              </div>
            </div>
          </div>
        )}

        {filteredClothes.length === 0 && (
          <div className="text-center text-light bg-dark p-4 rounded my-4 shadow">
            <h5>No clothes found with the selected filters or search.</h5>
          </div>
        )}

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
          {filteredClothes.map((item) => (
            <div
              className="col d-flex justify-content-center"
              data-aos="fade-up"
              key={item.id}

            >
<CardClothing
  id={item.id}
  imagen={item.imagen}
  titulo={item.titulo}
  precio={item.precio}
  categoria={item.categoria} // Esto debe coincidir con lo que usas en el componente
  stock={item.stock}
  coleccion={item.coleccion}
  color={item.color}
  colorcode={item.colorcode}
/>

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
