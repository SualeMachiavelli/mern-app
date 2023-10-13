const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: String,
    pictures: [Object],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);
