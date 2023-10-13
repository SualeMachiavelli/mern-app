const mongoose = require("mongoose");

const deluxeSchema = new mongoose.Schema(
  {
    deluxname: String,
    deluxprice: Number,
    deluxphotos: [Object],
    deluxsummary: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Deluxe", deluxeSchema);
