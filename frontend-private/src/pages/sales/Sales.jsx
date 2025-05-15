import React from 'react';
import SalesTable from './SalesTable'; 
import './Sales.css';

const Sales = () => {
  console.log('Rendering Sales Component'); 
  return (
    <>
    <div className="sales-page margin-top-global"> 
      <SalesTable /> 
    </div>
    </>
  );
};

export default Sales;
