import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Products.css';
import AOS from 'aos';
import { NavLink } from 'react-router-dom';
import 'aos/dist/aos.css';
import CardClothing from '../../components/cardClothing/CardClothing.jsx';

const Products = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collectionFilter, setCollectionFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('')
  const [maxPrice, setMaxPrice] = useState(200);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/product"); // Ajusta la URL si es necesario
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilters = () => setShowFilters(!showFilters);

  const clearFilters = () => {
    setQuery('');
    setCollectionFilter('');
    setColorFilter('');
    setCategoryFilter('');
    setSortOrder('');
    setMaxPrice(200);
  };

  const filteredClothes = products?.filter(item => {
      const matchSearch =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.color?.toLowerCase().includes(query.toLowerCase()) ||
        item.idCategory?.name?.toLowerCase().includes(query.toLowerCase()) ||
        (!isNaN(query) && Math.abs(item.prices - parseFloat(query)) < 5);

      const matchFilters =
        (collectionFilter ? item.description === collectionFilter : true) &&
        (colorFilter ? item.color === colorFilter : true) &&
        (categoryFilter ? item.idCategory?.name === categoryFilter : true) &&
        item.prices <= maxPrice;

      return matchSearch && matchFilters;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.prices - b.prices;
      if (sortOrder === 'desc') return b.prices - a.prices;
      return 0;
    });

  return (
    <>
      <div className="backproducts"></div>
      <div className="container content-zone py-5 pr-wi">
        <div className="title-wrapper text-center margin-top-global">
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
            <Link to={"/addproduct"} className="btn btn-addproducts">+ Add products</Link>
          </div>
        </div>

        {/* Filtros */}
        {showFilters && (
          <div className="filter-menu p-4 mt-3 rounded shadow-sm">
            {/* ... los filtros son iguales ... */}
          </div>
        )}

        {/* Mensaje de carga o sin resultados */}
        {loading ? (
          <div className="text-center text-light bg-dark p-4 rounded my-4 shadow">
            <h5>Loading products...</h5>
          </div>
        ) : filteredClothes.length === 0 ? (
          <div className="text-center text-light bg-dark p-4 rounded my-4 shadow">
            <h5>No clothes found with the selected filters or search.</h5>
          </div>
        ) : (
          <div className="row justify-content-center">
            {filteredClothes.map((item) => (
              <div className="col d-flex justify-content-center" data-aos="fade-up" key={item._id}>
                <CardClothing
                  id={item._id}
                  imagen={item.image}
                  titulo={item.name}
                  precio={item.prices}
                  categoria={item.idCategory?.name || 'No Category'}
                  stock={item.stock}
                  coleccion={item.description}
                  color={item.color}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;

