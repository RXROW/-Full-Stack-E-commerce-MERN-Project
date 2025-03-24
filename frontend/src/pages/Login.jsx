import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section (Form) */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold">Rabbit</h1>
            <p className="text-lg mt-2 font-semibold">Hey there! 👋</p>
          </div>

          <p className="text-sm text-gray-600 mb-4">Enter your username and password to login</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            <span className="text-gray-600">Don't have an account?</span>
            <Link to="/register" className="text-blue-600 hover:underline ml-1">Register</Link>
          </div>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="w-1/2">
        <img
          src="https://picsum.photos/800/600?random=5"
          alt="Login visual"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
