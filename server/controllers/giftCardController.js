const GiftCard = require("../models/giftModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createGiftCard = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  const user = await User.findById(req.user.id);
  let photos = [];

  req.files?.forEach((elem) => {
    const file = {
      fileName: elem.filename,
      filePath: elem.path,
      fileType: elem.mimetype,
      fileSize: elem.size,
    };

    photos.push(file);
  });

  const card = await GiftCard.create({
    name: req.body.name,
    price: req.body.price,
    type: req.body.type,
    quantity: req.body.quantity,
    description: req.body.description,
    photos: photos,
    user: req.body.user,
  });
  res.status(201).json({
    status: "success",
    message: "Uploaded Giftcard successfully",
    card,
  });

  try {
    sendEmail({
      email: user.email,
      subject: "Uploaded Gift card successfully",
      message: `Congratulations! ${user.username} You have successfully uploaded`,
    });
  } catch (err) {
    res.status(500).json({
      state: "error",
      message: "Error uploading gift card",
    });
  }
  next();
});

exports.getCards = catchAsync(async (req, res, next) => {
  let cards;
  const { min, max } = req.query;
  const page = req.query.page * 1;
  const limit = req.query.limit * 1;
  const skip = (page - 1) * limit;
  const price = req.query.price;
  const search = req.query.search
    ? {
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      }
    : {};

  if (req.query.name) {
    cards = await GiftCard.find({ name: req.query.name })
      .limit(limit)
      .skip(skip);
  } else if (req.query.type) {
    cards = await GiftCard.find({ type: req.query.type })
      .limit(limit)
      .skip(skip);
  } else {
    cards = await GiftCard.find(search)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: 1 });
  }

  // const fl = await Flower.find({ price: price });
  const cardsCount = await GiftCard.find();
  const count = cardsCount.length;
  res.status(200).json({
    status: "success",
    results: cards.length,
    count,
    cards,
  });
  next();
});

exports.getRelatedCards = catchAsync(async (req, res, next) => {
  // const flowers = await Flower({ _id: { $ne: req.params.id } });
  const cards = await GiftCard.find({
    _id: { $ne: req.params.id },
    type: "card",
  });
  res.status(200).json({
    status: "success",
    results: cards.length,
    cards,
  });
  next();
});

exports.getCard = catchAsync(async (req, res, next) => {
  const card = await GiftCard.findById(req.params.id);

  res.status(200).json({
    status: "success",
    card,
  });
  next();
});

exports.addToCart = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  // if (!req.body.flower) req.body.flower = req.params.id;
  if (!req.body.card) req.body.card = req.params.id;
  const cart = await Cart.create({
    type: req.body.type,
    price: req.body.price,
    total: req.body.total,
    quantity: req.body.quantity,
    card: req.body.card,
    name: req.body.name,
    photo: req.body.photo,
    flower: req.body.flower,
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

exports.getAddedCart = catchAsync(async (req, res, next) => {
  const carts = await Cart.find({ user: req.query.user });
  res.status(200).json({
    status: "success",
    carts,
  });
  next();
});

exports.deleteCard = catchAsync(async (req, res, next) => {
  await GiftCard.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Card deleted successfully ",
  });
  next();
});
