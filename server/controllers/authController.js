const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/usersPhotos");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("upload only photo", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

const sendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  let photo;
  if (req.file) photo = req.file.filename;
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    photo: req.file,
  });

  sendToken(newUser, 201, res);
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Provided email and password", 403));
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(req.body.password, user.password)))
    return next(new AppError("Incorrect email or password", 400));

  sendToken(user, 200, res);
  next();
});

exports.authorize = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.token && req.headers.token.startsWith("Bearer")) {
    token = req.headers.token.split(" ")[1];
  }

  if (!token)
    return next(
      new AppError("You're not logged in. Log in and try again.", 403)
    );
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) return next(new AppError("The token is not valid"));

  req.user = currentUser;
  next();
});

exports.restric = (role) =>
  catchAsync(async (req, res, next) => {
    if (req.user.role === role && req.user.role !== "user")
      return next(new AppError("You're not allow to perform this role", 403));
  });

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("There is no user with that email", 403));
  const resetToken = user.resetToken();
  await user.save();
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/users/resetpassword/${resetToken}`;
  const message = `Do you forget your password? use link ${resetURL}`;
  try {
    sendEmail({
      email: user.email,
      subject: "Reset your password",
      message,
    });
    res.status(200).json({
      status: "success",
      mesage: "Email sent successfully",
    });
  } catch (error) {
    res.status(200).json({
      status: "failed",
      mesage: "Email not sent",
      error,
    });
  }
  next();
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) return next(new AppError("Invalid token"));
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
  next();
});
