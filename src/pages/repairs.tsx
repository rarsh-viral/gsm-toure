
import React from 'react';
import ProductCard from './ProductCard';

interface RepairProductsProps {
  repairData: any[];
}

const RepairComponent = ({ repairData }:
RepairProductsProps) => {
  return (
    <div>
      <h2>Repair Products</h2>
      <ul>
        {repairData.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepairComponent;