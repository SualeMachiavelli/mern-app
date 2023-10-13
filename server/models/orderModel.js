const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
    },
    subtotal: {
      type: Number,
    },
    images: [Object],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: { type: Number },

    stocks: { type: Number },
    contact: { type: String, required: [true, "Enter a reachable contact"] },
  },
  {
    timestamps: true,
  }
);
orderSchema.pre(/^find/, function (next) {
  this.populate({
    select: "username photo",
    path: "user",
  });
  next();
});
module.exports = mongoose.model("Order", orderSchema);
