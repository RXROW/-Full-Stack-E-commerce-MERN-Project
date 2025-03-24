import React from 'react';

const OrderConfirmationPage = () => {
  const checkout = {
    _id: "12323",
    createdAt: new Date(),
    checkoutItems: [
      {
        productId: "1",
        name: "Jacket",
        color: "black",
        size: "M",
        price: 150,
        quantity: 1,
        image: "https://picsum.photos/150?random=1"
      }
    ]
  };

  // Calculate order totals
  const subtotal = checkout.checkoutItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // Assuming 8% tax
  const shipping = 10; // Flat shipping rate
  const total = subtotal + tax + shipping;

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg  ">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Thank you for your purchase</p>
        <p className="text-sm text-gray-500">Order #{checkout._id}</p>
        <p className="text-sm text-gray-500">
          {checkout.createdAt.toLocaleDateString()} at {checkout.createdAt.toLocaleTimeString()}
        </p>
      </div>

      <div className="border-t border-b py-4 my-4">
        <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
        {checkout.checkoutItems.map((item, index) => (
          <div key={index} className="flex items-center mb-4">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">
                {item.color}, Size: {item.size}
              </p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="my-4">
        <div className="flex justify-between my-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between my-2">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between my-2">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <h2 className="font-semibold text-lg mb-3">Shipping Details</h2>
        <div className="bg-gray-50 p-4 rounded">
          <p>John Doe</p>
          <p>123 Main Street</p>
          <p>Apt 4B</p>
          <p>New York, NY 10001</p>
          <p>United States</p>
        </div>
      </div>

      <div className="mt-8 text-center">
     
        <button className="border border-red-600 text-red-600 px-6 py-2 rounded hover:bg-blue-50">
          Continue Shopping
        </button>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>A confirmation email has been sent to johndoe@example.com</p>
        <p className="mt-2">
          If you have any questions, please contact our support team at support@example.com
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;