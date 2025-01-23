import React from 'react';
import Link  from 'next/link';

interface ProductProps {
  product: any;
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className="py-4 px-6 border
border-gray-400 rounded-lg shadow-md
hover:bg-gray-100">
      <h2 className="text-lg
font-bold">{product.name}</h2>
      <p className="text-sm">{product.price}</p>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      )}
      <Link href={`/products/${product.id}`}>
        <a className="bg-blue-500
hover:bg-blue-700 text-white font-bold py-2 px-4
rounded">View Details</a>
      </Link>
    </div>
  );
};

export default ProductCard;