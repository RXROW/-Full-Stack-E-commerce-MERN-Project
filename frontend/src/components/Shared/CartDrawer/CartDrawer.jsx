import React, { useState } from "react";
import { X, ShoppingCart } from "lucide-react";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";

const CartDrawer = ({ isOpen = false, setIsOpenCart = () => {}, items = [] }) => {
  const [cartItems, setCartItems] = useState(items);

  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems
        .map(item => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity + change);
            return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpenCart(false)} />}

      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white  z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <span className="ml-2 text-sm text-gray-500">({cartItems.length} items)</span>
          </div>
          <button
            onClick={() => setIsOpenCart(!isOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-220px)]">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4 text-gray-500">
              <ShoppingCart className="w-12 h-12 mb-2" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <ul className="divide-y">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} updateQuantity={updateQuantity} />
              ))}
            </ul>
          )}
        </div>
 
        <CartFooter subtotal={subtotal} cartItems={cartItems} setIsOpenCart={setIsOpenCart} />
      </div>
    </>
  );
};

export default CartDrawer;
