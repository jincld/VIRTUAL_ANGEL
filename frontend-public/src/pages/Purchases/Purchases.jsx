import React, { useEffect, useState } from 'react';
import './Purchases.css';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import OrderCard from '../../components/OrderCard/OrderCard';

const Purchases = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = selectedStatus === 'all'
      ? orders
      : orders.filter(o => o.status === selectedStatus);

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order._id.toLowerCase().includes(term) ||
        order.status.toLowerCase().includes(term) ||
        order.address.toLowerCase().includes(term) ||
        new Date(order.createdAt).toLocaleString().toLowerCase().includes(term) ||
        order.products.some(item =>
          item.idProduct?.name?.toLowerCase().includes(term)
        )
      );
    }

    setFilteredOrders(filtered);
  }, [selectedStatus, searchTerm, orders]);

  const fetchOrders = async () => {
    try {
      const resMe = await fetch('http://localhost:3001/api/me', {
        credentials: 'include',
      });
      if (!resMe.ok) return navigate('/login');
      const { userId } = await resMe.json();

      const res = await fetch('http://localhost:3001/api/orders', {
        credentials: 'include',
      });
      const allOrders = await res.json();

      const userOrders = allOrders.filter(o => o.idCustomer._id === userId);
      setOrders(userOrders);
      setFilteredOrders(userOrders);
    } catch (err) {
      console.error('Error fetching orders', err);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedStatus('all');
  };

  return (
    <div className="purchases-back">
      <div className="purchases-page">
        <div className="purchases-page-child">
        <h2 className="purchases-title">YOUR PURCHASES</h2>

        {/* Filtros y búsqueda */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-4">
          <input
            type="text"
            className="form-control search-purchases"
            placeholder="Search by product, status or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="d-flex gap-2 mt-2 mt-md-0">
            <select
              className="form-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Paid">Paid</option>
              <option value="Completed">Completed</option>
              <option value="Finished">Finished</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button className="btn btn-secondary btn-clearpurchases" onClick={clearSearch}>
              Clear
            </button>
          </div>
        </div>

        {/* Resultados */}
        {filteredOrders.length === 0 ? (
          <p className="text-center">No orders found</p>
        ) : (
          filteredOrders.map(order => <OrderCard key={order._id} order={order} />)
        )}
      </div>
      </div>
    </div>
  );
};

export default Purchases;
