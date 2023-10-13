const Flower = require("../models/flowerModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");

exports.postFlower = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  let photos = [];
  let profile = {};

  req.files?.forEach((elem) => {
    const file = {
      fileName: elem.filename,
      filePath: elem.path,
      fileType: elem.mimetype,
      fileSize: elem.size,
    };

    photos.push(file);
  });

  // if (req.file?.profile) {
  //   const file = {
  //     fileName: elem.filename,
  //     filePath: elem.path,
  //     fileType: elem.mimetype,
  //     fileSize: elem.size,
  //   };
  //   profile = file;
  // }

  const flower = await Flower.create({
    name: req.body.name,
    price: req.body.price,
    type: req.body.type,
    quantity: req.body.quantity,
    description: req.body.description,
    photos: photos,
  });
  res.status(201).json({
    status: "success",
    message: "Uploaded file successfully",
    flower,
  });

  // try {
  //   sendEmail({
  //     email: user.email,
  //     subject: "Uploaded flower successfully",
  //     message: `Congratulations! ${user.username} You have successfully uploaded`,
  //   });
  // } catch (err) {
  //   res.status(500).json({
  //     state: "error",
  //     message: "Error uploading flower",
  //   });
  // }
  next();
});

exports.getFlowers = catchAsync(async (req, res, next) => {
  let flowers;
  const { min, max } = req.query;
  const page = req.query.page * 1;
  const limit = req.query.limit * 1;
  const skip = (page - 1) * limit;
  const price = req.query.price;
  // const search = req.query.search;
  const search = req.query.search
    ? {
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      }
    : {};

  if (req.query.name) {
    flowers = await Flower.find({ name: req.query.name })
      .limit(limit)
      .skip(skip);
  } else if (req.query.type) {
    flowers = await Flower.find({ type: req.query.type })
      .limit(limit)
      .skip(skip);
  } else if (req.query.search && req.query.type) {
    flowers = await Flower.find(search);
  } else {
    flowers = await Flower.find(search);
  }

  // const fl = await Flower.find({ price: price });
  const flowersCount = await Flower.find();
  const count = flowersCount.length;
  res.status(200).json({
    status: "success",
    results: flowers.length,
    count,
    flowers,
  });
  next();
});

exports.getFlower = catchAsync(async (req, res, next) => {
  const flower = await Flower.findById(req.params.id);
  res.status(200).json({
    status: "success",
    flower,
  });
  next();
});

exports.getRelatedFlowers = catchAsync(async (req, res, next) => {
  // const flowers = await Flower({ _id: { $ne: req.params.id } });
  const flowers = await Flower.find({
    _id: { $ne: req.params.id },
    type: "flower",
  });
  res.status(200).json({
    status: "success",
    results: flowers.length,
    flowers,
  });
  next();
});

exports.addToCart = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  let card = [];
  let flower = [];
  if (req.body.flower) flower.push(req.body.flower);
  if (req.body.card) card.push(req.body.flower);
  const cart = await Cart.create({
    type: req.body.type,
    price: req.body.price,
    total: req.body.total,
    name: req.body.name,
    photo: req.body.photo,
    flower: req.body.flower,
    card: req.body.card,
    user: req.body.user,
    quantity: req.body.quantity,
  });

  res.status(201).json({
    status: "success",
    message: "Add to Cart successfully",
    cart,
  });
  next();
});

exports.deleteFlower = catchAsync(async (req, res, next) => {
  await Flower.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Flower deleted successfully ",
  });
  next();
});
