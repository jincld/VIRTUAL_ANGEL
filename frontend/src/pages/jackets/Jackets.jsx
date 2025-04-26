import React, { useEffect, useState } from 'react';
import './Jackets.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CardClothing from '../../components/cardClothing/CardClothing.jsx';
import jacketData from './JacketsData.jsx';


const Jacket = () => {
  
  useEffect(() => {
    AOS.init({
      duration: 1000,  // Duración de la animación
      easing: 'ease-in-out',  // Efecto de aceleración
      once: true,  // Ejecutar la animación solo una vez
      offset: 200,  // Desplazamiento desde el top para que inicie la animación
    });
  }, []);


  const [showFilters, setShowFilters] = useState(false);
const [collectionFilter, setCollectionFilter] = useState('');
const [colorFilter, setColorFilter] = useState('');
const [sortOrder, setSortOrder] = useState('');
const [maxPrice, setMaxPrice] = useState(200);

const toggleFilters = () => setShowFilters(!showFilters);

const clearFilters = () => {
  setCollectionFilter('');
  setColorFilter('');
  setSortOrder('');
  setMaxPrice(200);
};

const filteredJackets = jacketData
  .filter(Jacket =>
    (collectionFilter ? Jacket.coleccion === collectionFilter : true) &&
    (colorFilter ? Jacket.color === colorFilter : true) &&
    Jacket.precio <= maxPrice
  )
  .sort((a, b) => {
    if (sortOrder === 'asc') return a.precio - b.precio;
    if (sortOrder === 'desc') return b.precio - a.precio;
    return 0;
  });


  return (
    <>
      {/* Fondo fijo detrás del contenido */}
      <div className="backjackets"></div>

      {/* Contenedor del contenido encima del fondo */}
      <div className="container content-zone py-5">

      <div className="title-wrapper">
        <h1 className="jacketstitle">JACKETS</h1>
        </div>
        
        <div className="filter-wrapper mb-4">
  <button className="btn btnfilters" onClick={toggleFilters}>
    {showFilters ? 'Hide filters' : 'Show filters'}
  </button>

  {showFilters && (
    <div className="filter-menu p-4 mt-3 rounded shadow-sm">
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Collection:</label>
          <select className="form-select" value={collectionFilter} onChange={(e) => setCollectionFilter(e.target.value)}>
            <option value="">All</option>
            <option value="verano">ANGEL OR CRAZY</option>
            <option value="invierno">This Is Eclipse</option>
            <option value="limitada">GOOD BOY GONE BAD</option>
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Color:</label>
          <select className="form-select" value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
            <option value="">All</option>
            <option value="rojo">Red</option>
            <option value="negro">Black</option>
            <option value="blanco">White</option>
          </select>
        </div>

        <div className="col-md-4 mb-3">
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
</div>

{filteredJackets.length === 0 && (
  <div className="text-center text-light bg-dark p-4 rounded my-4 shadow">
    <h5>No clothes found with the selected filters.    </h5>
  </div>
)}

    
<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
  {filteredJackets.map((Jacket) => (
    <div className="col d-flex justify-content-center" data-aos="fade-up" key={Jacket.id}>
      <CardClothing
        imagen={Jacket.imagen}
        titulo={Jacket.titulo}
        precio={Jacket.precio}
        enlace={Jacket.enlace}
      />
    </div>
  ))}
</div>


      </div>
    </>
  );
};

export default Jacket;