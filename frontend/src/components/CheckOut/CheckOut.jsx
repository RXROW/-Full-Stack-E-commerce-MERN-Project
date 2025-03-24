import React, { useState } from 'react'; 
import PayPalButtonsComponent from "./PayPalButtonsComponent";
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
  });
  
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Check if all required fields are filled
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'postalCode', 'country', 'phone'];
    return requiredFields.every(field => formData[field].trim() !== '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsFormValidated(true);
      setShowPaymentOptions(true);
      console.log('Form validated:', formData);
    } else {
      alert("Please fill in all required fields");
    }
  };

  // Sample order items
  const orderItems = [
    {
      id: 1,
      name: 'Stylish Jacket',
      price: 120,
      size: 'M',
      color: 'Black',
      image: 'https://picsum.photos/150?random=1'
    },
    {
      id: 2,
      name: 'Casual Sneakers',
      price: 75,
      size: '42',
      color: 'White',
      image: 'https://picsum.photos/150?random=3'
    }
  ];

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);

  // Renders errors or successful transactions on the screen
  const Message = ({ content }) => {
    return <p className="text-center mt-4 p-3 bg-gray-100 rounded">{content}</p>;
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment Successful!", details);
    setMessage(`Transaction completed! Order ID: ${details.id}`);
    // Here you would typically redirect to an order confirmation page
    setTimeout(() => {
      navigate("/order-confirmation");
    }, 2000);
  };

  const handlePaymentError = (error) => {
    console.error("Payment failed:", error);
    setMessage(`Sorry, your transaction could not be processed: ${error.message || JSON.stringify(error)}`);
  };

 

  return ( 
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
          {/* Left Column - Form */}
          <div className="w-full md:w-3/5 p-8">
            <h1 className="text-2xl font-bold mb-6">CHECKOUT</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-4">Contact Details</h2>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@example.com"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    disabled={isFormValidated}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-4">Delivery</h2>
                
                <div className="flex gap-4 mb-4">
                  <div className="w-1/2">
                    <label htmlFor="firstName" className="block text-sm mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                      disabled={isFormValidated}
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="lastName" className="block text-sm mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                      disabled={isFormValidated}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    disabled={isFormValidated}
                  />
                </div>
                
                <div className="flex gap-4 mb-4">
                  <div className="w-1/2">
                    <label htmlFor="city" className="block text-sm mb-1">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                      disabled={isFormValidated}
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="postalCode" className="block text-sm mb-1">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                      disabled={isFormValidated}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="country" className="block text-sm mb-1">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    disabled={isFormValidated}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm mb-1">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    disabled={isFormValidated}
                  />
                </div>
              </div>
              
              {!showPaymentOptions ? (
                <button 
                  type="submit" 
                  className="w-full bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition duration-200"
                >
                  Continue to Payment
                </button>
              ) : (
                <div>
                  <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                  <PayPalButtonsComponent />
                  
                  {message && <Message content={message} />}
                  
                  <div className="mt-4 text-sm text-gray-500 text-center">
                    By clicking the PayPal button, you agree to our <a href="#" className="underline">Terms and Conditions</a>
                  </div>
                  
                  <div className="mt-6 border-t pt-4">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowPaymentOptions(false);
                        setIsFormValidated(false);
                        setMessage('');
                      }}
                      className="text-gray-600 underline"
                    >
                      Return to delivery information
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="w-full md:w-2/5 bg-white p-8 border-l border-gray-200">
            <h2 className="text-lg font-medium mb-6">Order Summary</h2>
            
            <div className="space-y-6">
              {orderItems.map(item => (
                <div key={item.id} className="flex items-start pb-4 border-b border-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <span className="font-medium">${item.price}</span>
                    </div>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm text-gray-600">Color: {item.color}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>${subtotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div> 
  );
};

export default CheckOut;