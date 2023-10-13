const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide a username"],
    },
    email: {
      type: String,
      required: [true, "please provide an email address"],
      trim: true,
      lower: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
    },
    photo: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (cPass) {
  return await bcrypt.compare(cPass, this.password);
};

userSchema.methods.resetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model("User", userSchema);
