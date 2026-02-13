const Admin = require("../model/admin");
const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
const SECRETKEY = "ADMINKEY";


// Create admin
exports.createAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;
    const adminExists = await Admin.findOne({email});
    if (adminExists) {
      return res.status(403).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const admin = await Admin.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        email: admin.email,
        password: admin.password
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//admin login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: "admin"
      },
      SECRETKEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email
      },
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all admins
exports.getadmin = async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).json({
      message: "Data successful",
      admin
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete admin
exports.deleteAdmin = async (req, res) => {
  try {
   const id = req.params.id.trim();

    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({
      message: "Admin deleted successfully",
      admin: deletedAdmin
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
