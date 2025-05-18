import React, { useEffect, useState } from 'react';
import './NewCollection.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams } from 'react-router-dom';

import CardClothing from '../../components/cardClothing/CardClothing.jsx';
import shirtsData from '../shirts/ShirtsData.jsx';
import PantsData from '../pants/PantsData';
import JacketsData from '../jackets/JacketsData';
import SweatersData from '../sweaters/SweatersData';

const NewCollection = () => {
  const { collectionName } = useParams();

  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collectionFilter, setCollectionFilter] = useState(collectionName || '');
  const [colorFilter, setColorFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [maxPrice, setMaxPrice] = useState(200);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 200,
    });
  }, []);

  useEffect(() => {
    if (collectionName && collectionName !== collectionFilter) {
      setCollectionFilter(collectionName);
    }
  }, [collectionName, collectionFilter]);

  const toggleFilters = () => setShowFilters(!showFilters);

  const clearFilters = () => {
    setQuery('');
    setColorFilter('');
    setSortOrder('');
    setMaxPrice(200);
  };

  const allProducts = [
    ...shirtsData.map(item => ({ ...item, category: 'shirts' })),
    ...PantsData.map(item => ({ ...item, category: 'pants' })),
    ...JacketsData.map(item => ({ ...item, category: 'jackets' })),
    ...SweatersData.map(item => ({ ...item, category: 'sweaters' })),
  ];

  const filteredNewCollection = allProducts
    .filter(item => {
      const matchSearch = query
        ? item.titulo.toLowerCase().includes(query.toLowerCase()) ||
          item.coleccion?.toLowerCase().includes(query.toLowerCase()) ||
          item.color?.toLowerCase().includes(query.toLowerCase()) ||
          (!isNaN(query) && Math.abs(item.precio - parseFloat(query)) < 5)
        : true;

      const matchFilters =
        (collectionFilter ? item.coleccion.toLowerCase() === collectionFilter.toLowerCase() : true) &&
        (colorFilter ? item.color === colorFilter : true) &&
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
      <div className="backnewcollection"></div>
      <div className="container content-zone py-5">


        <div className="title-wrapper margin-top-global">
          <h1 className="newcollectiontitle">{collectionFilter || 'New Collection'}</h1>
        </div>

                {/* Barra de búsqueda */}
        <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
          <input
            type="text"
            placeholder="Search for clothing..."
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

        {filteredNewCollection.length === 0 && (
          <div className="text-center text-light bg-dark p-4 rounded my-4 shadow">
            <h5>No clothes found with the selected filters or search.</h5>
          </div>
        )}

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
          {filteredNewCollection.map((item) => (
            <div className="col d-flex justify-content-center" data-aos="fade-up" key={item.id}>
              <CardClothing
                id={item.id}
                imagen={item.imagen}
                titulo={item.titulo}
                precio={item.precio}
                category={item.category}
                colorcode={item.colorcode}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewCollection;
