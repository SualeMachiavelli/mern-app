const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Order = require("../models/orderModel");

exports.createOrder = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;

  await Order.create({
    name: req.body.name,
    user: req.body.user,
    price: req.body.price,
    quantity: req.body.quantity,
    contact: req.body.contact,
    total: req.body.total,
    subtotal: req.body.subtotal,
    images: req.body.images,
  });

  res.status(201).json({
    status: "success",
    message: "Order created successfully",
  });
  next();
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    status: "success",
    results: orders.length,
    orders,
  });
  next();
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return next(new AppError(`There's no order with id ${req.params.id}`));
  res.status(200).json({
    status: "success",
    order,
  });
  next();
});
