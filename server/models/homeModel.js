const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  photos: [Object],
  quotes: [
    {
      type: String,
      lowercase: true,
    },
  ],
  titles: [
    {
      type: String,
      lowercase: true,
    },
  ],
});

module.exports = mongoose.model("Home", homeSchema);
