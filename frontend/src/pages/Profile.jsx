import React from 'react';
import MyOrders from './MyOrders';

const Profile = () => {
  // Sample user data
  const user = {
    name: 'John Doe',
    email: 'John@example.com'
  };

  // Sample orders data
  const orders = [
    {
      id: '12345',
      image: 'https://picsum.photos/50/50?random=1',
      created: '07/12/2024 16:35:57',
      shippingAddress: 'New York, USA',
      items: 1,
      price: '$29.99',
      status: 'Delivered'
    },
    {
      id: '34567',
      image: 'https://picsum.photos/50/50?random=2',
      created: '07/12/2024 16:35:57',
      shippingAddress: 'New York, USA',
      items: 1,
      price: '$45.50',
      status: 'Shipped'
    }
  ];

  return (
    <div className="container mx-auto p-4 my-10">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded shadow-md w-full md:w-1/4">
          <h2 className="text-xl font-bold mb-2">{user.name}</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition-colors">
            Logout
          </button>
        </div>

        {/* Orders Section */}
     <MyOrders orders={orders} />
      </div>
    </div>
  );
};

export default Profile;