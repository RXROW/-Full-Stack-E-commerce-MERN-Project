import React, { useState } from 'react';

const ProductsList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Printed Resort Shirt', price: 29.99, sku: 'PRNT-RES-004' },
    { id: 2, name: 'Chino Pants', price: 55, sku: 'BW-005' },
    { id: 3, name: 'Cargo Pants', price: 50, sku: 'BW-008' },
    { id: 4, name: 'Long-Sleeve Thermal Tee', price: 27.99, sku: 'LST-THR-009' },
    { id: 5, name: 'Pleated Midi Skirt', price: 55, sku: 'BW-W-004' },
    { id: 6, name: 'Graphic Print Tee', price: 30, sku: 'TW-W-006' },
    { id: 7, name: 'Ribbed Long-Sleeve Top', price: 55, sku: 'TW-W-007' },
    { id: 8, name: 'Slim-Fit Stretch Shirt', price: 29.99, sku: 'SLIM-SH-002' },
    { id: 9, name: 'Cargo Joggers', price: 45, sku: 'BW-002' },
    { id: 10, name: 'Off-Shoulder Top', price: 45, sku: 'TW-W-004' }
  ]);

  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: '',
    price: '',
    sku: ''
  });

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setCurrentProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      sku: product.sku
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setProducts(products.map(product => 
      product.id === currentProduct.id ? currentProduct : product
    ));
    
    setEditMode(false);
    setCurrentProduct({
      id: null,
      name: '',
      price: '',
      sku: ''
    });
  };

  const handleCancel = () => {
    setEditMode(false);
    setCurrentProduct({
      id: null,
      name: '',
      price: '',
      sku: ''
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      
      {/* Edit Product Form */}
      {editMode && (
        <div className="bg-white p-6 rounded shadow-sm mb-8">
          <h2 className="text-lg font-medium mb-4">Edit Product</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">SKU</label>
              <input
                type="text"
                name="sku"
                value={currentProduct.sku}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Products List Table */}
      <div className="bg-gray-100 rounded shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium">NAME</th>
              <th className="text-left py-3 px-4 font-medium">PRICE</th>
              <th className="text-left py-3 px-4 font-medium">SKU</th>
              <th className="text-left py-3 px-4 font-medium">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-gray-300">
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                <td className="py-3 px-4">{product.sku}</td>
                <td className="py-3 px-4">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;