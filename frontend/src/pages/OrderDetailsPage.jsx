import { ShoppingBag, Truck, CreditCard, Check, Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
}

  useEffect(() => { 
    const fetchOrderDetails = async () => {
      try {  
        const mockOrderDetails = {
          _id: 'e67540ced3376121b361a0ed0',
          createdAt: new Date('2024-07-12'),
          isPaid: true,
          isDelivered: false,
          paymentMethod: 'PayPal',
          shippingMethod: 'Standard',
          status: 'Approved',
          shippingAddress: {
            address: 'New York',
            country: 'USA'
          },
          orderItems: [
            {
              name: 'Slim-Fit Easy-Iron Shirt',
              qty: 1,
              price: 34.99,
              image: 'https://picsum.photos/150?random=3'
            },
            {
              name: 'Classic Oxford Button-Down Shirt',
              qty: 1,
              price: 39.99,
              image: 'https://picsum.photos/150?random=7'
            },
            {
              name: 'Slim-Fit Easy-Iron Shirt',
              qty: 1,
              price: 34.99,
              image: 'https://picsum.photos/150?random=5'
            },
            {
              name: 'Slim-Fit Easy-Iron Shirt',
              qty: 1,
              price: 34.99,
              image: 'https://picsum.photos/150?random=1'
            },
            {
              name: 'Chino Pants',
              qty: 1,
              price: 55,
              image: 'https://picsum.photos/150?random=2'
            }
          ],
        };
        
        setOrderDetails(mockOrderDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold">Order not found</h2>
        <p className="mt-2">The order you are looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  // Calculate total amount
  const totalAmount = orderDetails.orderItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Order Details</h1>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <div>
            <p className="font-semibold">Order ID: <span className="font-normal">{orderDetails._id}</span></p>
            <p className="text-sm text-gray-500">
              {orderDetails.createdAt.toLocaleDateString()}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium mr-2 ${
              orderDetails.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {orderDetails.status}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Pending Delivery
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <CreditCard className="h-5 w-5 mr-2 text-gray-700" />
            <h2 className="text-lg font-semibold">Payment Info</h2>
          </div>
          <div className="ml-7">
            <p className="mb-1"><span className="font-medium">Payment Method:</span> {orderDetails.paymentMethod}</p>
            <p><span className="font-medium">Status:</span> {orderDetails.isPaid ? 'Paid' : 'Not Paid'}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <Truck className="h-5 w-5 mr-2 text-gray-700" />
            <h2 className="text-lg font-semibold">Shipping Info</h2>
          </div>
          <div className="ml-7">
            <p className="mb-1"><span className="font-medium">Shipping Method:</span> {orderDetails.shippingMethod}</p>
            <p><span className="font-medium">Address:</span> {orderDetails.shippingAddress.address}, {orderDetails.shippingAddress.country}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex items-center mb-4">
          <ShoppingBag className="h-5 w-5 mr-2 text-gray-700" />
          <h2 className="text-lg font-semibold">Products</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                <th scope="col" className="px-4 py-3 text-right text-sm font-medium text-gray-500">Unit Price</th>
                <th scope="col" className="px-4 py-3 text-center text-sm font-medium text-gray-500">Quantity</th>
                <th scope="col" className="px-4 py-3 text-right text-sm font-medium text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderDetails.orderItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(orderDetails._id)}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md" src={item.image} alt={item.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-500">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">{item.qty}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">${(item.price * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan="3" className="px-4 py-3 text-right text-sm font-bold">Total Amount:</td>
                <td className="px-4 py-3 text-right text-sm font-bold">${totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <Link to={"/my-orders"} className="px-4 py-2 bg-red-900 hover:bg-red-950 text-white rounded-md transition duration-150 flex items-center">
        <ShoppingBag className="h-4 w-4 mr-1" />
        My Orders
        </Link>
      
      </div>
    </div>
  );
};

export default OrderDetailsPage;