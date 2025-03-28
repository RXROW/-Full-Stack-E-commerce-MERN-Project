const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/products
// @desc    Create a new Product
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      colors,
      sizes,
      collections,
      materail,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      colors,
      sizes,
      collections,
      materail,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   PUT /api/products/:id
// @desc    Update an existing Product
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.discountPrice = req.body.discountPrice || product.discountPrice;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.colors = req.body.colors || product.colors;
    product.sizes = req.body.sizes || product.sizes;
    product.collections = req.body.collections || product.collections;
    product.materail = req.body.materail || product.materail;
    product.gender = req.body.gender || product.gender;
    product.images = req.body.images || product.images;
    product.isFeatured = req.body.isFeatured ?? product.isFeatured;
    product.isPublished = req.body.isPublished ?? product.isPublished;
    product.tags = req.body.tags || product.tags;
    product.dimensions = req.body.dimensions || product.dimensions;
    product.weight = req.body.weight || product.weight;
    product.sku = req.body.sku || product.sku;
    const updatedProduct = await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// @route   DELETE /api/products/:id
// @desc    Delete a product by ID
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
