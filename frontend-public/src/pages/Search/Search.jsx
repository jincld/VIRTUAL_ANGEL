import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Search.css';
import CardClothing from '../../components/cardClothing/CardClothing.jsx';

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collectionFilter, setCollectionFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortOrder, setSortOrder] = useState('');
  const [recommended, setRecommended] = useState([]);

  // Estados para opciones de filtros dinámicos
  const [collections, setCollections] = useState([]);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });

    // Fetch de productos desde el backend
    fetch('http://localhost:3001/api/product', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);

        // Extraer opciones únicas para filtros
        setCollections([...new Set(data.map(p => p.coleccion).filter(Boolean))]);
        setColors([...new Set(data.map(p => p.color).filter(Boolean))]);
        setCategories([...new Set(data.map(p => p.category).filter(Boolean))]);

        // Recomendados: mezcla aleatoria y corta lista
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setRecommended(shuffled.slice(0, 8));
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  // Función para filtrar productos según búsqueda y filtros
  const filteredProducts = products
    .filter(item => {
      const lowerQuery = query.toLowerCase();

      // Búsqueda en varios campos
      const matchSearch =
        item.name?.toLowerCase().includes(lowerQuery) ||
        item.coleccion?.toLowerCase().includes(lowerQuery) ||
        item.color?.toLowerCase().includes(lowerQuery) ||
        item.category?.toLowerCase().includes(lowerQuery);

      // Aplicar filtros
      const matchFilters =
        (collectionFilter ? item.coleccion === collectionFilter : true) &&
        (colorFilter ? item.color === colorFilter : true) &&
        (categoryFilter ? item.category === categoryFilter : true) &&
        item.price <= maxPrice;

      return matchSearch && matchFilters;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  const clearFilters = () => {
    setQuery('');
    setCollectionFilter('');
    setColorFilter('');
    setCategoryFilter('');
    setSortOrder('');
    setMaxPrice(200);
  };

  // Contenedor estilo flexbox para cards, usado tanto para recomendados como filtrados
  const cardsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1.5rem',
  };

  const cardWrapperStyle = {
    flex: '1 1 280px',
    maxWidth: '300px',
    display: 'flex',
    justifyContent: 'center',
  };

  // Nuevo: definimos si hay algún filtro activo o búsqueda
  const hasFilter =
    query.trim() !== '' ||
    collectionFilter !== '' ||
    colorFilter !== '' ||
    categoryFilter !== '' ||
    maxPrice !== 200 ||
    sortOrder !== '';

  return (
    <>
      <div className="backsearch"></div>
      <div className="container content-zone py-5 margin-top-global">
        <div className="search-container">
          <h1 className="search-title">SEARCH PRODUCTS</h1>

          <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
            <input
              type="text"
              placeholder="Look for your perfect item..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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
                <div className="col-md-3 mb-3">
                  <label className="form-label">Collection:</label>
                  <select
                    className="form-select"
                    value={collectionFilter}
                    onChange={(e) => setCollectionFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    {collections.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label">Color:</label>
                  <select
                    className="form-select"
                    value={colorFilter}
                    onChange={(e) => setColorFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    {colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label">Category:</label>
                  <select
                    className="form-select"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3 mb-3">
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
                  <label className="form-label">Max price: ${maxPrice}</label>
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

          {/* Mostrar recomendados solo si NO hay filtros ni búsqueda */}
          {!hasFilter && recommended.length > 0 && (
            <>
              <h2 className="recommend-title">Recommended for you</h2>
              <div style={cardsContainerStyle}>
                {recommended.map((item) => (
                  <div key={item._id} data-aos="fade-up" style={cardWrapperStyle}>
                    <CardClothing
                      id={item._id}
                      imagen={item.image}
                      titulo={item.name}
                      precio={item.price}
                      categoria={item.category}
                      stock={item.stock}
                      coleccion={item.coleccion}
                      color={item.color}
                      colorcode={item.colorcode}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Mostrar productos filtrados solo si hay algún filtro o búsqueda */}
          {hasFilter && (
            <>
              {filteredProducts.length === 0 ? (
                <p className="no-results">No products found.</p>
              ) : (
                <div style={cardsContainerStyle}>
                  {filteredProducts.map((item) => (
                    <div key={item._id} data-aos="fade-up" style={cardWrapperStyle}>
                      <CardClothing
                        id={item._id}
                        imagen={item.image}
                        titulo={item.name}
                        precio={item.price}
                        categoria={item.category}
                        stock={item.stock}
                        coleccion={item.coleccion}
                        color={item.color}
                        colorcode={item.colorcode}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
