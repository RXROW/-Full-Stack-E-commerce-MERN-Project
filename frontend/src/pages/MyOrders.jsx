import React from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  // Mock orders data
  const orders = [
    {
      id: 'e67540ced33',
      image: 'https://picsum.photos/150?random=4',
      created: 'July 12, 2024',
      shippingAddress: 'New York, USA',
      items: '5 items',
      price: '$199.96',
      status: 'Approved',
      primaryImage: 'https://picsum.photos/150?random=3'
    },
    {
      id: 'b82351fed22',
      image: '/api/placeholder/120/120',
      created: 'June 23, 2024',
      shippingAddress: 'San Francisco, CA',
      items: '2 items',
      price: '$89.99',
      status: 'Delivered',
      primaryImage: 'https://picsum.photos/150?random=1'
    },
    {
      id: 'c45612aed88',
      image: 'https://picsum.photos/150?random=2',
      created: 'June 15, 2024',
      shippingAddress: 'Chicago, IL',
      items: '3 items',
      price: '$125.50',
      status: 'Shipped',
      primaryImage: 'https://picsum.photos/150?random=9'
    },
 
  ];

  return (
    <div className="bg-white p-6 rounded shadow-md w-full md:w-3/4 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5" />
          My Orders
        </h2>
        <div className="text-sm text-gray-500">
          Showing {orders.length} orders
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Address</th>
              <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img src={order.primaryImage} alt={`Order ${order.id}`} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="py-3 px-4 font-medium">#{order.id}</td>
                <td className="py-3 px-4 text-gray-600">{order.created}</td>
                <td className="py-3 px-4 text-gray-600">{order.shippingAddress}</td>
                <td className="py-3 px-4 text-gray-600">{order.items}</td>
                <td className="py-3 px-4 font-medium">{order.price}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                     order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                     order.status === 'Approved' ? 'bg-yellow-100 text-yellow-800' :
                     'bg-gray-100 text-gray-800'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <Link 
                    to={`/orders/${order.id}`}
                    className="inline-flex items-center px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
          <Link to="/products" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Start Shopping
          </Link>
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing orders from the last 3 months
        </div>
        <button 
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition duration-150"
        >
          View All Orders
        </button>
      </div>
    </div>
  );
};

export default MyOrders;