const mongoose = require("mongoose");

const elegantSchema = new mongoose.Schema(
  {
    elegantname: String,
    elegantprice: Number,
    elegantphotos: [Object],
    elegantsummary: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Elegant", elegantSchema);
