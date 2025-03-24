import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
 
    const { darkMode} = useTheme();
  // Navigation items array for better maintainability
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
      ),
      path: '/admin/dashbourd',
      active: true
    },
    {
      id: 'users',
      label: 'Users',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      ),
      path: '/admin/users',
      active: false
    },
    {
      id: 'products',
      label: 'Products',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
        </svg>
      ),
      path: '/admin/products',
      active: false
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
      ),
      path: '/admin/orders',
      active: false
    },
    {
      id: 'shop',
      label: 'Shop',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
      ),
      path: '/',
      active: false
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
      path: '#',
      active: false
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ),
      path: '#',
      active: false
    }
  ];

  // Group navigation items by category
  const mainNavItems = navigationItems.slice(0, 5);
  const systemNavItems = navigationItems.slice(5);

  return (
    <>
      <div 
        className={`${'bg-gradient-to-b from-gray-900 to-gray-800'} text-white w-full md:w-64 fixed md:relative inset-0 transform min-h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-300 ease-in-out z-20 flex flex-col overflow-y-auto`}
      >
        {/* Close button for mobile */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-400 hover:text-white md:hidden"
          aria-label="Close sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        {/* Logo and Title */}
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className={`bg-white rounded-full p-1.5`}>
              <svg className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-gray-900'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-2xl">Rabbit</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>
  
        {/* User info section */}
        <div className="px-6 py-2">
          <div className={`flex items-center space-x-3 ${darkMode ? 'bg-gray-800' : 'bg-gray-800 bg-opacity-50'} p-3 rounded-lg`}>
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@example.com</p>
            </div>
          </div>
        </div>
        
        <div className="px-4 py-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
            Main
          </div>
          <nav>
            <ul>
              {mainNavItems.map((item) => (
                <li key={item.id} className="mb-1">
                  <Link
                    to={item.path} 
                    className={`flex items-center py-2.5 px-3 rounded-lg transition-colors duration-200 ${
                      item.active 
                        ? `${darkMode ? 'bg-blue-800' : 'bg-blue-600'} text-white` 
                        : `text-gray-300 hover:${darkMode ? 'bg-gray-800' : 'bg-gray-700'} hover:text-white`
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    {item.active && (
                      <span className="ml-auto bg-blue-500 rounded-full w-2 h-2"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        <div className="px-4 py-2 mt-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
            System
          </div>
          <nav>
            <ul>
              {systemNavItems.map((item) => (
                <li key={item.id} className="mb-1">
                  <a 
                    href={item.path} 
                    className={`flex items-center py-2.5 px-3 rounded-lg transition-colors duration-200 ${
                      item.active 
                        ? `${darkMode ? 'bg-blue-800' : 'bg-blue-600'} text-white` 
                        : `text-gray-300 hover:${darkMode ? 'bg-gray-800' : 'bg-gray-700'} hover:text-white`
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Spacer to push logout to bottom */}
        <div className="flex-grow"></div>
        
        {/* Version indicator */}
        <div className="px-6 py-2">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-800 bg-opacity-50'} py-2 px-3 rounded-lg text-xs text-gray-400 flex justify-between items-center`}>
            <span>Version 1.2.4</span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              Online
            </span>
          </div>
        </div>
        
        {/* Logout button */}
        <div className="p-4">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-lg flex items-center justify-center transition-colors duration-200 font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Logout
          </button>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Sidebar;