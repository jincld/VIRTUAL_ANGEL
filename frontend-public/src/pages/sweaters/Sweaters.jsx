import React, { useEffect, useState } from 'react';
import './Sweaters.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CardClothing from '../../components/cardClothing/CardClothing.jsx';

const Sweaters = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collectionFilter, setCollectionFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [maxPrice, setMaxPrice] = useState(200);
  const [collections, setCollections] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 200,
    });

    fetch('http://localhost:3001/api/product', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        // Filtrar solo sweaters
        const sweaters = data.filter(item => item.category?.toLowerCase() === 'sweaters');
        setProducts(sweaters);

        // Obtener colecciones y colores únicos para filtros
        setCollections([...new Set(sweaters.map(s => s.coleccion).filter(Boolean))]);
        setColors([...new Set(sweaters.map(s => s.color).filter(Boolean))]);
      })
      .catch(err => console.error('Error fetching sweaters:', err));
  }, []);

  const toggleFilters = () => setShowFilters(!showFilters);

  const clearFilters = () => {
    setQuery('');
    setCollectionFilter('');
    setColorFilter('');
    setSortOrder('');
    setMaxPrice(200);
  };

  const filteredSweaters = products
    .filter(sweater => {
      const q = query.toLowerCase();
      const matchSearch =
        (sweater.name?.toLowerCase().includes(q) || '') ||
        (sweater.coleccion?.toLowerCase().includes(q) || '') ||
        (sweater.color?.toLowerCase().includes(q) || '') ||
        (!isNaN(query) && Math.abs(sweater.price - parseFloat(query)) < 5);

      const matchFilters =
        (collectionFilter ? sweater.coleccion === collectionFilter : true) &&
        (colorFilter ? sweater.color === colorFilter : true) &&
        sweater.price <= maxPrice;

      return matchSearch && matchFilters;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <>
      <div className="backsweaters"></div>

      <div className="container content-zone py-5">
        <div className="title-wrapper">
          <h1 className="sweaterstitle margin-top-global">SWEATERS</h1>
        </div>

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

        {showFilters && (
          <div className="filter-menu p-4 mt-3 rounded shadow-sm">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Collection:</label>
                <select
                  className="form-select"
                  value={collectionFilter}
                  onChange={(e) => setCollectionFilter(e.target.value)}
                >
                  <option value="">All</option>
                  {collections.map(col => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Color:</label>
                <select
                  className="form-select"
                  value={colorFilter}
                  onChange={(e) => setColorFilter(e.target.value)}
                >
                  <option value="">All</option>
                  {colors.map(color => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Sort by price:</label>
                <select
                  className="form-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
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
                <button className="btn btn-limpiar" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            </div>
          </div>
        )}

        {filteredSweaters.length === 0 && (
          <div className="text-center text-light bg-dark p-4 rounded my-4 shadow">
            <h5>No clothes found with the selected filters or search.</h5>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          {filteredSweaters.map((sweater) => (
            <div
              key={sweater._id}
              data-aos="fade-up"
              style={{
                flex: '1 1 280px',  // flexible para crecer y encoger, ancho base 280px
                maxWidth: '300px',  // máximo ancho para cada card
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CardClothing
                id={sweater._id}
                imagen={sweater.image}
                titulo={sweater.name}
                precio={sweater.price}
                categoria={sweater.category}
                stock={sweater.stock}
                coleccion={sweater.coleccion}
                color={sweater.color}
                colorcode={sweater.colorcode}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sweaters;
