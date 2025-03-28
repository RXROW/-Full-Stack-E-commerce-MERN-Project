const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    seedData();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Function to seed data
const seedData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany([
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "123456",  
        role: "admin",
      },
    ]);

    const UserID = createdUsers[0]._id;

      const sampleProducts = products.map((product) => {
            return { ...product, user: UserID };
      } 
        
     );

    await Product.insertMany(sampleProducts);

    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("Error with data import:", error);
    process.exit(1);
  }
};
