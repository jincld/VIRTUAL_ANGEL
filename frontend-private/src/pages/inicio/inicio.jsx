import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import './inicio.css';

const salesData = [
  { month: 'JAN', shirts: 20, pants: 50, accessories: 150 },
  { month: 'FEB', shirts: 70, pants: 120, accessories: 100 },
  { month: 'MAR', shirts: 120, pants: 200, accessories: 300 },
  { month: 'APR', shirts: 200, pants: 300, accessories: 250 },
  { month: 'MAY', shirts: 350, pants: 250, accessories: 150 },
];

const pieData = [
  { name: 'WHIP WHIPLASH COLLECTION', value: 35.7 },
  { name: 'CRAZY OR ANGEL COLLECTION', value: 21.4 },
  { name: 'NINETEEN’S KITSCH COLLECTION', value: 14.3 },
  { name: 'THIS IS ECLIPSE COLLECTION', value: 28.6 },
];



const COLORS = ['#750000', '#C10000', '#888888', '#1E1E1E'];

const Dashboard = () => (
  <div className="backinicio text-white margin-top-global">
    <div className="dashboard">
    <h2 className="fw-bold mb-3 welcome-title-inicio h2-inicio">WELCOME</h2>

      {/* Primera fila de gráficas */}
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
              <Line type="monotone" dataKey="accessories" stroke="#888888" name="Accessories" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="pie-chart">
          <h3>TOTAL SALES RATE BY COLLECTION</h3>
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
                  <Cell key={`cell-1-${index}`} fill={COLORS[index]} />
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

export default Dashboard;