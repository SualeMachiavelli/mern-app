const mongoose = require("mongoose");
const { Schema } = mongoose;
const reviewSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    user: { type: Schema.ObjectId, ref: "User", required: true },
    photo: { type: String },
    flower: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Flower",
      },
    ],
    card: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "GiftCard",
      },
    ],
  },
  {
    timestamps: true,
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "photo username comment rating",
  });
  next();
});

module.exports = mongoose.model("Review", reviewSchema);
