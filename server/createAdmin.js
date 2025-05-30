const mongoose = require("mongoose");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const admin = new Admin({
    email: "admin@example.com",
    password: "admin123"
  });
  await admin.save();
  console.log("✅ Admin created");
  mongoose.disconnect();
});
