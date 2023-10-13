const mongoose = require("mongoose");

const flowerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "provide flower's name"],
      lowercase: true,
    },
    price: {
      type: Number,
      required: [true, "provide price's price"],
    },
    type: {
      type: String,
      lowercase: true,
      enum: ["card", "flower"],
    },
    orderStatus: {
      type: Boolean,
      default: false,
    },
    description: { type: String },
    profile: {
      type: Object,
    },
    rating: { type: Number },
    quantity: { type: Number, default: 0 },
    photos: [Object],
    reviews: [{ type: mongoose.Schema.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

flowerSchema.pre(/^find/, function (next) {
  this.populate({
    path: "reviews",
    select: "comment rating image",
  });
  next();
});

module.exports = mongoose.model("Flower", flowerSchema);
