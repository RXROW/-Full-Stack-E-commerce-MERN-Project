const express = require("express");
const { Cart } = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }

  return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged in user
// @access Public
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId && // Change here
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId: productId, // Change here
          name: product.name,
          image: product.images?.[0]?.url || "",
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      cart.totalPrice = cart.products.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      await cart.save();
      return res.status(200).json(cart);
    } else {
      const newCart = new Cart({
        user: userId || undefined,
        guestId: guestId || "guest_" + new Date().getTime(),
        products: [
          {
            productId: productId, // Change here
            name: product.name,
            image: product.images?.[0]?.url || "",
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      await newCart.save();
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error("Cart creation error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


 

// @route PUT /api/cart
// @desc Update product quantity in the cart for a guest or logged-in user
// @access Public
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId && p.size === size && p.color === color
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    } 
    if (quantity > 0) {
      cart.products[productIndex].quantity = quantity;
    } else { 
      cart.products.splice(productIndex, 1);
    }
 
    cart.totalPrice = cart.products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
 
    await cart.save();
    
    return res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    console.error("Cart update error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});




// @route DELETE /api/cart
// @desc Remove a product from the cart
// @access Public
router.delete("/", async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;
    
    try {
        let cart = await getCart(userId, guestId);

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);

        // Recalculate the cart total
        cart.total = cart.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

        // Save the updated cart
        await cart.save();

        return res.status(200).json({
            message: "Product removed from cart successfully",
            cart: cart
        });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        return res.status(500).json({ 
            message: "An error occurred while removing the product from cart",
            error: error.message 
        });
    }
}); 

// @route GET /api/cart
// @desc Get logged-in user's or guest user's cart
// @access Public
router.get("/", async (req, res) => {
    const { userId, guestId } = req.query;

    // Validate that at least one identifier is provided
    if (!userId && !guestId) {
        return res.status(400).json({ 
            message: "Either userId or guestId must be provided" 
        });
    }

    try {
        const cart = await getCart(userId, guestId);
        
        if (!cart) {
            // Return an empty cart structure if none exists
            return res.status(200).json({
                products: [],
                total: 0,
                message: "No cart found, returning empty cart"
            });
        }

        // Return the found cart
        return res.status(200).json(cart);

    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({ 
            message: "An error occurred while fetching the cart",
            error: error.message 
        });
    }
});



// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body;

    // Validate guestId is provided
    if (!guestId) {
        return res.status(400).json({ message: "Guest ID is required" });
    }

    try {
        // Find the guest cart and user cart
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id }); // Changed from req.user_id to req.user._id

        // If no guest cart found, return error
        if (!guestCart) {
            return res.status(404).json({ message: "Guest cart not found" });
        }

        // If guest cart is empty, return early
        if (guestCart.products.length === 0) {
            return res.status(200).json({ 
                message: "Guest cart is empty, nothing to merge",
                cart: userCart || { products: [], total: 0, user: req.user._id }
            });
        }

        let mergedCart;
        
        // Case 1: User has no existing cart
        if (!userCart) {
            mergedCart = new Cart({
                user: req.user._id,
                products: guestCart.products,
                total: guestCart.total
            });
        } 
        // Case 2: User has existing cart - merge products
        else {
            // Create a map of product keys (id+size+color) to avoid duplicates
            const productMap = new Map();
            
            // Add user's existing products to the map
            userCart.products.forEach(product => {
                const key = `${product.productId}-${product.size}-${product.color}`;
                productMap.set(key, product);
            });
            
            // Merge guest cart products
            guestCart.products.forEach(product => {
                const key = `${product.productId}-${product.size}-${product.color}`;
                
                if (productMap.has(key)) {
                    // Product exists - update quantity
                    const existing = productMap.get(key);
                    existing.quantity += product.quantity;
                } else {
                    // New product - add to map
                    productMap.set(key, product);
                }
            });
            
            // Convert map back to array
            mergedCart = userCart;
            mergedCart.products = Array.from(productMap.values());
            
            // Recalculate total
            mergedCart.total = mergedCart.products.reduce(
                (sum, product) => sum + (product.price * product.quantity), 
                0
            );
        }

        // Save the merged cart
        await mergedCart.save();
        
        // Delete the guest cart
        await Cart.deleteOne({ guestId });

        return res.status(200).json({
            message: "Cart merged successfully",
            cart: mergedCart
        });

    } catch (error) {
        console.error("Error merging carts:", error);
        return res.status(500).json({ 
            message: "An error occurred while merging carts",
            error: error.message 
        });
    }
});

module.exports = router;
