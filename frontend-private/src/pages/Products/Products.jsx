import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Products.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CardClothing from '../../components/cardClothing/CardClothing.jsx';

const Products = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collectionFilter, setCollectionFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [maxPrice, setMaxPrice] = useState(200);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]); // Estado para las colecciones únicas
  const [colors, setColors] = useState([]); // Estado para los colores únicos
  const [categories, setCategories] = useState([]); // Estado para las categorías únicas

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });

    fetch('http://localhost:3001/api/product', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Error fetching products: ' + res.status);
        return res.json();
      })
      .then(data => {
        setProducts(data);

        // Extraemos las colecciones únicas
        const uniqueCollections = [
          ...new Set(data.map(product => product.coleccion).filter(Boolean)),
        ];
        setCollections(uniqueCollections);

        // Extraemos los colores únicos
        const uniqueColors = [
          ...new Set(data.map(product => product.color).filter(Boolean)),
        ];
        setColors(uniqueColors);

        // Extraemos las categorías únicas
        const uniqueCategories = [
          ...new Set(data.map(product => product.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error(err));
  }, []);

  // Filtrado y búsqueda
  const filteredClothes = products
    .filter(item => {
      const q = query.toLowerCase();
      const matchSearch =
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.coleccion && item.coleccion.toLowerCase().includes(q)) ||
        (item.color && item.color.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (!isNaN(query) && Math.abs(item.price - parseFloat(query)) < 5);

      const matchFilters =
        (collectionFilter
          ? item.coleccion && item.coleccion.toLowerCase() === collectionFilter.toLowerCase()
          : true) && // Comprobamos si item.coleccion existe antes de hacer toLowerCase()
        (colorFilter ? item.color.toLowerCase() === colorFilter.toLowerCase() : true) &&
        (categoryFilter
          ? item.category && item.category.toLowerCase() === categoryFilter.toLowerCase()
          : true) &&
        item.price <= maxPrice;

      return matchSearch && matchFilters;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.precio - b.precio;
      if (sortOrder === 'desc') return b.precio - a.precio;
      return 0;
    });

  // Función para limpiar filtros
  const clearFilters = () => {
    setCollectionFilter('');
    setColorFilter('');
    setCategoryFilter('');
    setMaxPrice(200);
  };

  return (
    <>
      <div className="backproducts"></div>
      <div className="container content-zone py-5">
        <div className="title-wrapper text-center margin-top-global">
          <h1 className="shirtstitle">
            {categoryFilter ? categoryFilter.toUpperCase() : 'ALL PRODUCTS'}
          </h1>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
          <input
            type="text"
            placeholder="Search for items..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input form-control input-style"
            style={{ maxWidth: '400px' }}
          />
          <button className="btn btnfilters" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Hide filters' : 'Show filters'}
          </button>
          <div>
            <Link to="/addproduct" className="btn btn-addproducts">
              + Add products
            </Link>
          </div>
        </div>

        {showFilters && (
  <div className="filter-menu p-4 mt-3 rounded shadow-sm">
    {/* Filtros con Bootstrap Grid */}
    <div className="row">
      {/* Filtro: Collection */}
      <div className="col-md-6 mb-3">
        <label>Collection</label>
        <select
          value={collectionFilter}
          onChange={(e) => setCollectionFilter(e.target.value)}
          className="form-control"
        >
          <option value="">All</option>
          {collections.map((collection) => (
            <option key={collection} value={collection}>
              {collection}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro: Color */}
      <div className="col-md-6 mb-3">
        <label>Color</label>
        <select
          value={colorFilter}
          onChange={(e) => setColorFilter(e.target.value)}
          className="form-control"
        >
          <option value="">All</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro: Category */}
      <div className="col-md-6 mb-3">
        <label>Category</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="form-control"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro: Max Price */}
      <div className="col-md-6 mb-3">
        <label>Max Price</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          min="0"
          className="form-control"
        />
      </div>
    </div>

    {/* Botón Clear Filters */}
    <div className="d-flex justify-content-end">
      <button className="btn btn-dark" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  </div>
)}


        {filteredClothes.length === 0 && (
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
          {filteredClothes.map((item) => (
            <div
              key={item._id}
              data-aos="fade-up"
              style={{
                flex: '1 1 280px',
                maxWidth: '300px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CardClothing
                id={item._id}
                imagen={item.image} // antes: item.imagen
                titulo={item.name} // antes: item.titulo
                precio={item.price} // antes: item.precio
                categoria={item.category} // antes: item.categoria
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
