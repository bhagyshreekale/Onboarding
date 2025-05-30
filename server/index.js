require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes"); // <-- Add this line

const app = express();

// ✅ CORS Configuration (Only Allow Specific Origin)
const corsOptions = {
  origin: process.env.FRONTEND_URL ||"http://localhost:5173", 
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// ✅ Routes
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes); // <-- Add this line

// ✅ Serve Uploaded Filess

app.use("/uploads", express.static("uploads"));
app.use("/admin", require("./routes/adminAuth"));
app.use("/admin", require("./routes/adminRoutes")); 


// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop server if DB connection fails
  });

// ✅ Server Setup
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("🚀 Onboarding API Running");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
