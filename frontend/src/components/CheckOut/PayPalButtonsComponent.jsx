import React, { useState } from "react"; 
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

// Product data
const orderItems = [
  { name: "Premium T-Shirt", price: 29.99, quantity: 1 },
  { name: "Designer Jeans", price: 79.99, quantity: 1 },
];

// Calculate total price
const itemTotal = orderItems
  .reduce((sum, item) => sum + item.price * item.quantity, 0)
  .toFixed(2);

const PayPalButtonsComponent = () => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useNavigate();
  
  // Client ID should be in environment variables in production
  const CLIENT_ID = "AUnaB38_6wHAd1_T6AN4inIbYkStabHm9BxncoiTXKyuBTWqD_lrYoNfOjTMpGiwSQh7zWKKsBeZFch0";
  
  return (
    <div>
      {paymentStatus && (
        <div className="my-4 p-4 bg-red-100 rounded">
          {paymentStatus}
        </div>
      )}
      
      <PayPalScriptProvider
        options={{
          "client-id": CLIENT_ID,
          currency: "USD",
          intent: "capture",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: itemTotal,
                    breakdown: {
                      item_total: { currency_code: "USD", value: itemTotal },
                    },
                  },
                  items: orderItems.map((item) => ({
                    name: item.name.substring(0, 127),
                    unit_amount: {
                      currency_code: "USD",
                      value: item.price.toFixed(2),
                    },
                    quantity: item.quantity.toString(),
                    category: "PHYSICAL_GOODS",
                  })),
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              // Use PayPal's built-in capture method instead of manual API calls
              const order = await actions.order.capture();
              console.log("Payment details:", order);
              
              if (order.status === "COMPLETED") {
                setPaymentStatus(`Payment completed! ID: ${order.id}`);
              } else {
                setPaymentStatus("Payment was not completed successfully.");
              }
            } catch (err) {
              console.error("Capture error:", err);
              setPaymentStatus(`Payment processing failed: ${err.message}`);
              navigate("/order-confirmation");
            }
          }}
          onError={(err) => {
            console.error("PayPal Error:", err);
            setPaymentStatus(`Payment error: ${err.message}`);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalButtonsComponent;