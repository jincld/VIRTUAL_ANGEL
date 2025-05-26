import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import './inicio.css';

const COLORS = ['#750000', '#C10000', '#888888', '#1E1E1E', '#6c757d', '#343a40'];

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
       const res = await fetch('http://localhost:3001/api/order', {
  headers: {
    'Authorization': `Bearer ${tuToken}`,
  }
});

if (!res.ok) {
  throw new Error(`HTTP error! Status: ${res.status}`);
}

const orders = await res.json();
        const monthlyData = {};

        orders.forEach(order => {
          const date = new Date(order.createdAt);
          const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();

          if (!monthlyData[month]) {
            monthlyData[month] = { month, shirts: 0, pants: 0, jackets: 0, sweaters: 0 };
          }

          order.idProducts.forEach(product => {
            const category = product.category?.toLowerCase();
            if (category?.includes('shirt')) monthlyData[month].shirts++;
            else if (category?.includes('pant')) monthlyData[month].pants++;
            else if (category?.includes('jacket')) monthlyData[month].jackets++;
            else if (category?.includes('sweater')) monthlyData[month].sweaters++;
          });
        });

        const finalSalesData = Object.values(monthlyData).sort((a, b) =>
          new Date(`1 ${a.month} 2023`) - new Date(`1 ${b.month} 2023`)
        );

        setSalesData(finalSalesData);
      } catch (error) {
        console.error('Error loading sales data:', error);
      }
    };

    const fetchPieData = async () => {
      try {
       const res = await fetch('http://localhost:3001/api/product'); // Asegúrate de que esta ruta devuelve productos
        const products = await res.json();

        const categoryMap = {};

        products.forEach(product => {
          const category = product.category || 'Unknown';
          categoryMap[category] = (categoryMap[category] || 0) + 1;
        });

        const pieChartData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
        setPieData(pieChartData);
      } catch (err) {
        console.error('Error loading product data:', err);
      }
    };

    fetchSalesData();
    fetchPieData();
  }, []);

  return (
    <div className="backinicio text-white margin-top-global">
      <div className="dashboard">
        <h2 className="fw-bold mb-3 welcome-title-inicio h2-inicio">WELCOME</h2>

        <div className="charts-container">
          <div className="line-chart">
            <h3>SALE OF ITEMS</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="shirts" stroke="#FF0000" name="Shirts" />
                <Line type="monotone" dataKey="pants" stroke="#1E1E1E" name="Pants" />
                <Line type="monotone" dataKey="jackets" stroke="#6c757d" name="Jackets" />
                <Line type="monotone" dataKey="sweaters" stroke="#343a40" name="Sweaters" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="pie-chart">
            <h3>TOTAL SALES RATE BY CATEGORY</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <button className="details-button">VIEW DETAILS →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

