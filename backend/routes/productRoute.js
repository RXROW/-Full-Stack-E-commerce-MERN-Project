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
      material,
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
      material,
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
    product.material = req.body.material || product.material;
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



 // @route   GET /api/products
 // @desc    Get all products with optional query filters
 // @access  Public

router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    // ==== Query Builder ====
    const query = {};

    if (collection && collection.toLowerCase() !== "all") {
      query.collections = collection;
    }

    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.size = { $in: size.split(",") };
    }

    if (color) {
      query.color = { $in: [color] };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // ==== Sort Logic ====
    const sortOptions = {
      priceAsc: { price: 1 },
      priceDesc: { price: -1 },
      popularity: { rating: -1 },
    };

    const sort = sortOptions[sortBy] || {};

    // ==== Limit ====
    const resultLimit = parseInt(limit) || 20;

    // ==== Fetch Data ====
    const products = await Product.find(query)
      .sort(sort)
      .limit(resultLimit);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});

// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public

router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });

    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No best seller found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});





// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 products - Creation date
// @access Public

router.get("/new-arrivals", async (req, res) => {
  try {
    // Fetch latest 8 products
    const newArrivals = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8);

    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});








// @route   GET /api/products/:id
// @desc    Get a single product by ID
// @access  Public

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});



// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's gender and category
// @access Public

router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, // Exclude the current product ID
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});












module.exports = router;
