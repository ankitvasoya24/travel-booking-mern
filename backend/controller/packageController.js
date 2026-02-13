const Package = require("../model/package");

exports.createPackage = async (req, res) => {
  try {
    
    const newPackage = await Package.create(req.body);

    res.status(201).json({
      message: "Package created successfully",
      data: newPackage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();

    res.status(200).json({
      success: true,
      total: packages.length,
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getPackageById = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json(packageData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const mongoose = require("mongoose");

exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPackage = await Package.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPackage) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: updatedPackage,
    });

  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);

    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({
      message: "Package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
