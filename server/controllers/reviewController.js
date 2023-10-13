const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.flower) req.body.flower = req.params.flowerId;
  // if (!req.body.flower) req.body.flower = req.params.id;
  await Review.create({
    comment: req.body.comment,
    rating: req.body.rating,
    photo: req.body.photo,
    user: req.body.user,
    flower: req.body.flower,
    card: req.body.card,
  });

  res.status(201).json({
    status: "success",
    message: "Review created successfully",
  });
  next();
});

exports.getReviews = catchAsync(async (req, res, next) => {
  let reviews;
  if (req.query.createdAt) {
    reviews = await Review.find({ flower: req.params.flowerId }).sort({
      createdAt: req.query.createdAt,
    });
  } else {
    reviews = await Review.find({ flower: req.params.flowerId });
  }

  res.status(200).json({
    status: "success",
    reviews,
  });
  next();
});
