const mongoose = require("mongoose");

const classiqueSchema = new mongoose.Schema(
  {
    classiquename: String,
    classiqueprice: Number,
    classiquephotos: [Object],
    classiquesummary: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Classique", classiqueSchema);
