const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    card: {
      type: mongoose.Schema.ObjectId,
      ref: "GiftCard",
    },

    flower: {
      type: mongoose.Schema.ObjectId,
      ref: "Flower",
    },

    dataId: { type: String },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    quantity: { type: Number, required: true },
    name: { type: String, required: true },
    photo: Object,
    type: { type: String, required: true },
    total: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
