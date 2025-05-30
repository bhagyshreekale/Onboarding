const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: Date, required: true },
  businessName: { type: String, required: true },
  businessType: { type: String, required: true },
  businessCategory: { type: String, required: true },
  services: { type: [String], required: true },  // ✅ Array for multiple services
  logo: { type: String },
  establishmentDate: { type: Date, default: Date.now },  // ✅ Default value set
  businessMobile: { type: String, required: true },
  businessWhatsapp: { type: String, required: true },
  businessAddress: { type: String, required: true },
  coordinator: { type: String, required: true },
  socialMedia: {
    instagramId: { type: String },
    instagramPassword: { type: String, select: false },  // 🔒 Hide password from queries
    facebookAccess: { type: String },
    youtubeAccess: { type: String },
    gmbAccess: { type: String },
  },
});

// 🔒 Hash Instagram Password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("socialMedia.instagramPassword")) {
    this.socialMedia.instagramPassword = await bcrypt.hash(
      this.socialMedia.instagramPassword,
      10
    );
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
