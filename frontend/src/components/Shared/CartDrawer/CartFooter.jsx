import React from "react";
import { ArrowRight } from "lucide-react";
import { Link   } from "react-router-dom";

const CartFooter = ({ subtotal, cartItems, setIsOpenCart }) => { 
 
  return (
    <div className="border-t p-4 bg-gray-50">
      <div className="flex justify-between mb-4">
        <span className="font-medium">Subtotal</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>
      <Link to="/checkout"
      onClick={() => setIsOpenCart(false)}
        className="w-full bg-black text-white py-3 px-4 rounded-lg 
                 flex items-center justify-center gap-2
                 hover:bg-gray-800 transition-colors"
        disabled={cartItems.length === 0}
      >
        Checkout
        <ArrowRight className="w-4 h-4" />
      </Link>
      <button
        onClick={() => setIsOpenCart(false)}
        className="w-full mt-2 py-1 px-4 rounded-lg
                 border border-gray-300
                 hover:bg-gray-100 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default CartFooter;
