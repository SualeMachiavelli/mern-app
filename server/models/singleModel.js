const mongoose = require("mongoose");

const singleSchema = new mongoose.Schema(
  {
    singlename: String,
    singleprice: Number,
    singlephotos: [Object],
    singlesummary: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Single", singleSchema);
