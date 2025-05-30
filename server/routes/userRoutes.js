const express = require("express");
const multer = require("multer");
const {
  createUser,
  getUsers,
  deleteUser,
  updateUser
} = require("../controllers/userController");

const router = express.Router();

// ✅ Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// ✅ Routes
router.post("/register", upload.single("logo"), createUser);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser); // 🔴 Delete API
router.put("/users/:id", upload.single("logo"), updateUser); // 🔁 Update API (logo bhi handle karega)

module.exports = router;
