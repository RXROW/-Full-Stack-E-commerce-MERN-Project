import React, { useState } from 'react';

const OrdersList = () => {
  const [orders, setOrders] = useState([
    { id: '#67540ced337612fb361a0ed0', customer: 'Admin User', totalPrice: 199.96, status: 'Processing' },
    { id: '#67540d3ca67b4a70e434e092', customer: 'Admin User', totalPrice: 40, status: 'Processing' },
    { id: '#675bf2c6ca77bd83eefd7a18', customer: 'Admin User', totalPrice: 39.99, status: 'Processing' },
    { id: '#675c24b09b8827304bd5cc1', customer: 'Admin User', totalPrice: 39.99, status: 'Processing' }
  ]);

  const statusOptions = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleMarkAsDelivered = (orderId) => {
    handleStatusChange(orderId, 'Delivered');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      
      {/* Orders List Table */}
      <div className="bg-gray-100 rounded shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium">ORDER ID</th>
              <th className="text-left py-3 px-4 font-medium">CUSTOMER</th>
              <th className="text-left py-3 px-4 font-medium">TOTAL PRICE</th>
              <th className="text-left py-3 px-4 font-medium">STATUS</th>
              <th className="text-left py-3 px-4 font-medium">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-300">
                <td className="py-3 px-4 text-sm">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">${order.totalPrice.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <div className="relative">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="py-1 px-2 pr-8 border border-gray-300 rounded bg-white appearance-none w-full"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                      <svg className="fill-current h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <button 
                    onClick={() => handleMarkAsDelivered(order.id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded"
                  >
                    Mark as Delivered
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

export default OrdersList;