const mongoose = require("mongoose");

const buoquetSchema = new mongoose.Schema(
  {
    single: {
      singlename: String,
      singleprice: Number,
      singlesummary: String,
      singlePhotos: Object,
      single: Object,
    },
    elegant: {
      elegantname: String,
      elegantprice: Number,
      elegantsummary: String,
      elegantPhotos: Object,
      elegant: Object,
    },

    classique: {
      classiquename: String,
      classiqueprice: Number,
      classiquesummary: String,
      classiquePhotos: Object,
      classique: Object,
    },

    deluxe: {
      deluxename: String,
      deluxeprice: Number,
      deluxesummary: String,
      deluxePhotos: Object,
      deluxe: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Buoquet", buoquetSchema);
