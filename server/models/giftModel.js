const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    photos: [Object],
    rating: { type: Number },
    description: { type: String },
    type: { type: String },
    reviews: [{ type: String }],
    quantity: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GiftCard", giftSchema);
