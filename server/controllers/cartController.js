const GiftCard = require("../models/cartModel");
const Cart = require("../models/cartModel");
const Flower = require("../models/flowerModel");
const catchAsync = require("../utils/catchAsync");

exports.addToCart = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.flower) req.body.flower = req.params.id;
  await Cart.create({
    flower: req.body.flower,
    user: req.body.user,
    price: req.body.price,
    quantity: req.body.quantity,
    total: req.body.total,
    photo: req.body.photo,
    type: req.body.type,
  });

  res.status(201).json({
    status: "success",
    message: "Add to cart successfully",
  });
  next();
});

exports.getCartItems = catchAsync(async (req, res, next) => {
  const carts = await Cart.find({ user: req.user.id });
  res.status(200).json({
    status: "success",
    results: carts.length,
    carts,
  });

  next();
});

exports.getAddedItem = catchAsync(async (req, res, next) => {
  const card = await GiftCard.findById(req.params.id);
  // const flowerId = flower._id;
  // const cart = await Cart.findById(req.params.flowerId);
  // cart.flowers.includes(flowerId);

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

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const exist = await Cart.findOne({ card: req.params.id });
  //  const alreadyAdded = await Cart.findOneAndUpdate({
  //     card: req.params.id,
  //     quantity: req.body.quantity,
  //   });

  if (exist) {
    const updatedItems = {
      quantity: req.body.quantity,
      total: req.body.total,
    };
    const alreadyAdded = await Cart.findOneAndUpdate({
      card: req.params.id,
      quantity: req.body.quantity,
      total: req.body.total,
    });
    res.status(200).json({
      message: "Item updated",
      updatedItem: alreadyAdded,
    });
  } else {
    if (!req.body.user) req.body.user = req.user.id;
    // if (!req.body.flower) req.body.flower = req.params.id;
    if (!req.body.card) req.body.card = req.params.id;
    const cart = await Cart.create({
      type: req.body.type,
      price: req.body.price,
      total: req.body.total,
      card: req.body.card,
      dataId: req.body.dataId,
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
  }

  next();
});

exports.checkIfAddedCard = catchAsync(async (req, res, next) => {
  const item = await Cart.findOne({ card: req.params.id });
  if (item) {
    res.status(200).json({
      status: true,
    });
  } else {
    res.status(200).json({
      status: false,
    });
  }
  next();
});

exports.checkIfAddedFlower = catchAsync(async (req, res, next) => {
  const item = await Cart.findOne({ flower: req.params.id });
  if (item) {
    res.status(200).json({
      status: true,
    });
  } else {
    res.status(200).json({
      status: false,
    });
  }
  next();
});

exports.removeCartItem = catchAsync(async (req, res, next) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Cart deleted successfully",
  });
  next();
});

exports.getAllCartItems = catchAsync(async (req, res, next) => {
  const carts = await Cart.find();
  res.status(200).json({
    status: "success",
    results: carts.length,
    carts,
  });
  next();
});
