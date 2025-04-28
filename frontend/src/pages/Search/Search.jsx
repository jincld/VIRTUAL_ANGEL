import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Search.css';
import CardClothing from '../../components/cardClothing/CardClothing.jsx';

import shirtsData from '../../pages/shirts/ShirtsData';
import PantsData from '../../pages/pants/PantsData';
import JacketsData from '../../pages/jackets/JacketsData';
import SweatersData from '../../pages/sweaters/SweatersData';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collectionFilter, setCollectionFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortOrder, setSortOrder] = useState('');
  const [results, setResults] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const allProducts = [
    ...shirtsData.map(item => ({ ...item, category: 'shirts' })),
    ...PantsData.map(item => ({ ...item, category: 'pants' })),
    ...JacketsData.map(item => ({ ...item, category: 'jackets' })),
    ...SweatersData.map(item => ({ ...item, category: 'sweaters' }))
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    setRecommended(shuffled.slice(0, 8));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    filterAndSetResults(value);
  };

  const filterAndSetResults = (searchTerm) => {
    const filtered = allProducts.filter((item) => {
      const matchTitle = item.titulo.toLowerCase().includes(searchTerm);
      const matchColor = item.color?.toLowerCase().includes(searchTerm);
      const matchCollection = item.coleccion?.toLowerCase().includes(searchTerm);
      const matchPrice = !isNaN(searchTerm) && Math.abs(item.precio - parseFloat(searchTerm)) < 5;

      const matchesSearch = matchTitle || matchColor || matchCollection || matchPrice;
      const matchesFilters =
        (collectionFilter ? item.coleccion === collectionFilter : true) &&
        (colorFilter ? item.color === colorFilter : true) &&
        item.precio <= maxPrice;

      return matchesSearch && matchesFilters;
    });

    const sorted = filtered.sort((a, b) => {
      if (sortOrder === 'asc') return a.precio - b.precio;
      if (sortOrder === 'desc') return b.precio - a.precio;
      return 0;
    });

    setResults(sorted);
  };

  const clearFilters = () => {
    setCollectionFilter('');
    setColorFilter('');
    setSortOrder('');
    setMaxPrice(200);
    filterAndSetResults(query);
  };

  useEffect(() => {
    filterAndSetResults(query); // Aplicar filtros y búsqueda cuando la página se carga
  }, [query, collectionFilter, colorFilter, maxPrice, sortOrder]);

  return (
    <>
      <div className="backsearch"></div>
      
      <div className="search-container">
        <h1 className="search-title">SEARCH PRODUCTS</h1>

        <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
          <input
            type="text"
            placeholder="Search by name, color, collection, or price..."
            value={query}
            onChange={handleSearch}
            className="search-input form-control input-style"
            style={{ maxWidth: '400px' }}
          />
          <button className="btnfilters btnsearchfilters" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Hide filters' : 'Show filters'}
          </button>
        </div>

        {showFilters && (
          <div className="filter-menu p-4 mt-3 rounded shadow-sm">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Collection:</label>
                <select className="form-select" value={collectionFilter} onChange={(e) => {
                  setCollectionFilter(e.target.value);
                  filterAndSetResults(query);
                }}>
                  <option value="">All</option>
                  <option value="ANGEL OR CRAZY">ANGEL OR CRAZY</option>
            <option value="This Is Eclipse">This Is Eclipse</option>
            <option value="GOOD BOY GONE BAD">GOOD BOY GONE BAD</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Color:</label>
                <select className="form-select" value={colorFilter} onChange={(e) => {
                  setColorFilter(e.target.value);
                  filterAndSetResults(query);
                }}>
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
                <select className="form-select" value={sortOrder} onChange={(e) => {
                  setSortOrder(e.target.value);
                  filterAndSetResults(query);
                }}>
                  <option value="">No order</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>

            <div className="row mt-3 align-items-center">
              <div className="col-md-9">
                <label className="form-label">Max price: ${maxPrice}</label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="200"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(parseFloat(e.target.value));
                    filterAndSetResults(query);
                  }}
                />
              </div>
              <div className="col-md-3 text-end">
                <button className="btn btn-limpiar" onClick={clearFilters}>Clear filters</button>
              </div>
            </div>
          </div>
        )}

        {query === '' && recommended.length > 0 && (
          <>
            <h2 className="recommend-title">Recommended for you</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
              {recommended.map((item) => (
                <div className="col d-flex justify-content-center" data-aos="fade-up" key={item.id}>
                  <CardClothing
                    id={item.id}
                    imagen={item.imagen}
                    titulo={item.titulo}
                    precio={item.precio}
                    category={item.category}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {query !== '' && (
          <>
            {results.length === 0 ? (
              <p className="no-results">No products found.</p>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
                {results.map((item) => (
                  <div className="col d-flex justify-content-center" data-aos="fade-up" key={item.id}>
                    <CardClothing
                      id={item.id}
                      imagen={item.imagen}
                      titulo={item.titulo}
                      precio={item.precio}
                      category={item.category}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SearchPage;
