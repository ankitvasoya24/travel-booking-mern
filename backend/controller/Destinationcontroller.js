const Destination = require("../model/destination");
const mongoose = require("mongoose");

// Create Destination
exports.createDestination = async (req, res) => {
  try {
    const { title, category, image, reviews, description, price, badge } = req.body;

    const newPackage = await Destination.create({
      title,
      category,
      image,
      reviews: reviews || 0,
      description: description || "",
      price,
      badge: badge || "",
    });

    //  const newPackage = await Destination.create(req.body);

    res.status(201).json({ 
      success: true, 
      message: "Destination created", 
      data: newPackage });
  } catch (error) {
    
    res.status(400).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get All Packages
exports.getAllDestination = async (req, res) => {
  try {
    const packages = await Destination.find();
    res.status(200).json({ success: true, total: packages.length, data: packages });
  } catch (error) {
  
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update Package
exports.updateDestination = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid package ID" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: "No data provided for update" });
    }

    const updatedPackage = await Destination.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPackage) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }

    res.status(200).json({ success: true, message: "Package updated", data: updatedPackage });
  } catch (error) {
   
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete Package
exports.deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid package ID" });
    }

    const deletedPackage = await Destination.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }

    res.status(200).json({ success: true, message: "Package deleted", data: deletedPackage });
  } catch (error) {
    console.error("DELETE PACKAGE ERROR 👉", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get Single Package
exports.getPackageById = async (req, res) => {
  try {
    const { id } = req.params;

    const packageItem = await Package.findById(id);

    if (!packageItem) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }

    res.status(200).json({ success: true, data: packageItem });
  } catch (error) {
    
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
