import React from 'react'
import { Link } from 'react-router-dom'

const ProductGrid = ({ products }) => {
  return (
    <div className='w-full h-full flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-3 px-1'>
      {products.map((product) => (
        <Link
          to={`/product/${product._id}`}
          key={product._id}
          className='bg-white rounded hover:ring-1 ring-gray-400 transition-all duration-200 overflow-hidden flex flex-col h-full'
        >
          <img
            src={product.images[0].url}
            alt={product.name}
            className='w-full h-64 object-cover object-center'
          />
          <div className='p-4 flex-1 flex flex-col justify-between'>
            <h2 className='font-semibold text-lg'>{product.name}</h2>
            <p className='text-gray-500'>${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductGrid
