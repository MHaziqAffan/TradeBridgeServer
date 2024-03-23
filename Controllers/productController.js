const Product = require("../Models/Product");
const Category = require("../Models/Category");

const addProduct = async (req, res) => {
  const { productName, categoryId } = req.body;

  try {
    // Check if the product name already exists in the category
    const category = await Category.findOne({ categoryId: categoryId });

    const existingProduct = await Product.findOne({ productName: productName });
    console.log(existingProduct);
    if (existingProduct) {
      return res
        .status(202)
        .json({ message: "Product name already exists" });
    }

    // Create the product
    const product = new Product({
      productName: productName,
    });

    const savedProduct = await product.save();

    // Push the new product into the category's products array
    category.products.push(savedProduct);

    // Save the updated category
    await category.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
const fetchProductByCategoryId = async (req, res) => {
  const categoryId = req.params.categoryId; // Extract category ID from request parameters

  try {
    const products = await Category.findOne({
      categoryId: categoryId,
    }).populate("products");

    if (products) {
      res.status(200).json({ products: products.products });
    } else {
      res
        .status(404)
        .json({ message: "No products found for the specified category ID" });
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addProduct, fetchProductByCategoryId };
