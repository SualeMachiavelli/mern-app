const Home = require("../models/homeModel");
const catchAsync = require("../utils/catchAsync");
exports.uploadImages = catchAsync(async (req, res, next) => {
  const photos = [];

  req.files.forEach((file) => {
    const filepath = {
      filePath: file.path,
      fileSize: file.size,
      fileType: file.mimeType,
      fileName: file.filename,
    };

    photos.push(filepath);
  });

  const alreadyExists = await Home.find();
  if (alreadyExists) {
    await Home.deleteMany();
  }

  const home = await Home.create({
    quotes: req.body.quotes,
    titles: req.body.titles,
    photos: photos,
  });

  res.status(201).json({
    status: "success",
    home,
  });

  next();
});

exports.getHome = catchAsync(async (req, res, next) => {
  const home = await Home.find();
  res.status(200).json({
    status: "success",
    result: home.length,
    home,
  });
  next();
});
