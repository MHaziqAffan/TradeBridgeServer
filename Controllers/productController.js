const Product = require('../Models/Product');
const Category = require('../Models/Category');

const addProduct = async (req, res) => {
    const { productName, categoryId } = req.body;

    try {
        // Check if the product name already exists in the category
        const category = await Category.findOne({ categoryId: categoryId })

        const existingProduct = await Product.findOne({productName : productName});
        console.log(existingProduct)
        if (existingProduct) {
            return res.status(202).json({ message: "Product name already exists in the category" });
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

module.exports = { addProduct };
