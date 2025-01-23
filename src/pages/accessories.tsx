import React from 'react';
import ProductCard from '../pages/ProductCard';

interface AccessoriesProductsProps {
  accessoriesData: any[];
}

const AccessoriesComponent = ({ accessoriesData
}: AccessoriesProductsProps) => {
  return (
    <div>
      <h2>Accessories</h2>
      <ul>
        {accessoriesData.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccessoriesComponent;