import React, { useEffect, useState } from 'react';
import './Sweaters.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CardClothing from '../../components/cardClothing/CardClothing.jsx';
import sweatersData from './SweatersData.jsx';

const Sweaters = () => {
  
  useEffect(() => {
    AOS.init({
      duration: 1000,  // Duración de la animación
      easing: 'ease-in-out',  // Efecto de aceleración
      once: true,  // Ejecutar la animación solo una vez
      offset: 200,  // Desplazamiento desde el top para que inicie la animación
    });
  }, []);

  // Estado para manejar la búsqueda
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collectionFilter, setCollectionFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [maxPrice, setMaxPrice] = useState(200);

  const toggleFilters = () => setShowFilters(!showFilters);

  const clearFilters = () => {
    setQuery('');
    setCollectionFilter('');
    setColorFilter('');
    setSortOrder('');
    setMaxPrice(200);
  };

  // Filtrar los sweaters considerando la búsqueda
  const filteredSweaters = sweatersData
    .filter(sweater => {
      const matchSearch = 
        sweater.titulo.toLowerCase().includes(query.toLowerCase()) ||
        sweater.coleccion?.toLowerCase().includes(query.toLowerCase()) ||
        sweater.color?.toLowerCase().includes(query.toLowerCase()) ||
        (!isNaN(query) && Math.abs(sweater.precio - parseFloat(query)) < 5);

      const matchFilters =
        (collectionFilter ? sweater.coleccion === collectionFilter : true) &&
        (colorFilter ? sweater.color === colorFilter : true) &&
        sweater.precio <= maxPrice;

      return matchSearch && matchFilters;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.precio - b.precio;
      if (sortOrder === 'desc') return b.precio - a.precio;
      return 0;
    });

  return (
    <>
      {/* Fondo fijo detrás del contenido */}
      <div className="backsweaters"></div>

      {/* Contenedor del contenido encima del fondo */}
      <div className="container content-zone py-5">
        <div className="title-wrapper">
          <h1 className="sweaterstitle margin-top-global">SWEATERS</h1>
        </div>

        {/* Barra de búsqueda */}
        <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
          <input
            type="text"
            placeholder="Search for sweaters..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input form-control input-style"
            style={{ maxWidth: '400px' }}
          />
          <button className="btn btnfilters" onClick={toggleFilters}>
            {showFilters ? 'Hide filters' : 'Show filters'}
          </button>
        </div>

        {/* Filtros */}
        {showFilters && (
          <div className="filter-menu p-4 mt-3 rounded shadow-sm">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Collection:</label>
                <select className="form-select" value={collectionFilter} onChange={(e) => setCollectionFilter(e.target.value)}>
                  <option value="">All</option>
                  <option value="ANGEL OR CRAZY">ANGEL OR CRAZY</option>
                  <option value="This Is Eclipse">This Is Eclipse</option>
                  <option value="GOOD BOY GONE BAD">GOOD BOY GONE BAD</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
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

        {filteredSweaters.length === 0 && (
          <div className="text-center text-light bg-dark p-4 rounded my-4 shadow">
            <h5>No clothes found with the selected filters or search.</h5>
          </div>
        )}

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
          {filteredSweaters.map((sweater) => (
            <div className="col d-flex justify-content-center" data-aos="fade-up" key={sweater.id}>
              <CardClothing key={sweater.id} {...sweater} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sweaters;
