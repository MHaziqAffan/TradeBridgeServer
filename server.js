
const express = require('express');
const mongoose = require('./Config/db'); 
const cors = require('cors'); 
const fileupload=require('express-fileupload')
const userRoutes = require('./Routes/userRouter'); // Import your routes
const categoryRoutes = require('./Routes/categoryRouter'); // Import your routes
const productRoutes = require('./Routes/productRouter'); // Import your routes
const gigRoutes=require('./Routes/GigRouter');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors())
app.use(fileupload({useTempFiles:true}))
app.use(express.json()); // Parse JSON requests 

// Routes
app.use('/user', userRoutes); // Prefix all user routes with /api
app.use('/category', categoryRoutes); // Prefix all user routes with /api
app.use('/product', productRoutes); // Prefix all user routes with /api
app.use('/gig',gigRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
