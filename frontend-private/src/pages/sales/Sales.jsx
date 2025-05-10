import React from 'react';
import SalesTable from './SalesTable'; 

const Sales = () => {
  console.log('Rendering Sales Component'); 
  return (
    <div className="sales-page"> 
      <SalesTable /> 
    </div>
  );
};

export default Sales;
