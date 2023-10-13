const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const filterObj = (obj, ...allowedFields) => {
  let newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    users,
  });
  next();
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return next(new AppError("No user found with ID " + req.params.id));

  res.status(200).json({
    status: "success",
    user,
  });
  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (
    !user |
    !(await user.correctPassword(req.body.confirmPassword, user.password))
  )
    return next(new AppError("Your current password is incorrect", 403));
  user.password = req.body.password;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "Your password has been updated successfully",
    user,
  });
  next();
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);
  res.status(200).json({
    status: "success",
    message: "Account has been deleted successfully",
  });
  next();
});

exports.updateData = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "username", "email", "photo");
  if (req.file) filteredBody.photo = req.file.filename;
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    user,
  });

  next();
});

exports.getAccount = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});
