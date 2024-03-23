// controllers/gigController.js
const Gig = require("../Models/Gig");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "ddfhsv4xc",
  api_key: "253751116837458",
  api_secret: "7zMR-CaUfYOZoMq5n8GZ-TZyeKE",
});
// Controller method for showing all gigs
const showGigs = async (req, res) => {
  try {
    const gigs = await Gig.find();
    res.status(200).json({ gigs: gigs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller method for adding a new gig
const addGig = async (req, res) => {
  const { category, product, description, price, seller } = req.body;

  try {
    const files = req.files.image;
    cloudinary.uploader.upload(

        files.tempFilePath,
        (cloudinaryErr, cloudinaryResult) => {
          if (cloudinaryErr) {
            return res
              .status(201)
              .json({ message: "Error uploading image to Cloudinary" });
          }

          // Create a new user object with the provided data
          const newGig = new Gig({
            category,
            product,
            description,
            price,
            seller,
            image:cloudinaryResult.url,
          });
      

          // Save the user object to the database
          newGig
            .save()
            .then(() => {
              res
                .status(202)
                .json({ message: "Gig created successfully" });
            })
            .catch((saveErr) => {
              console.error("Error saving Gig to the database:", saveErr);
              res
                .status(201)
                .json({ message: "Error saving gig to the database" });
            });
        }
      );
    // Create a new gig object with the provided data
    
    // Save the gig object to the database
    //await newGig.save();

    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  showGigs,
  addGig,
};
