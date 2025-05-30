const User = require("../models/User");
const fs = require("fs");
const path = require("path");

// Create User
exports.createUser = async (req, res) => {
  try {
    console.log("✅ Received Data:", req.body);
    console.log("✅ Received File:", req.file);

    const newUser = new User({ ...req.body, logo: req.file?.filename });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("❌ Error saving user:", error.message);
    res.status(500).json({ message: "Error saving user", error: error.message });
  }
};

// Get Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-socialMedia.instagramPassword");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    console.log("Delete User Called:", req.params.id);  // 👈 Add this log
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Update User
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // If new logo uploaded, delete old logo file
    if (req.file && user.logo) {
      const oldLogoPath = path.join(__dirname, "..", "uploads", user.logo);
      if (fs.existsSync(oldLogoPath)) {
        fs.unlinkSync(oldLogoPath);
      }
    }

    const updatedData = { ...req.body };
    if (req.file) updatedData.logo = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};
