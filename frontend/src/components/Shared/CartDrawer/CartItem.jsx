import React from "react";
import { Minus, Plus } from "lucide-react";

const CartItem = ({ item, updateQuantity }) => {
  return (
    <li className="p-4">
      <div className="flex gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              className="p-1 hover:bg-gray-100 rounded"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="p-1 hover:bg-gray-100 rounded"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
