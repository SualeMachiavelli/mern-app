const catchAsync = require("../utils/catchAsync");
const Gallery = require("../models/galleryModel");

const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/Gallery");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("upload only pictures", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.multipleUploads = upload;

exports.createGallery = catchAsync(async (req, res, next) => {
  let pictures = [];
  if (req.files.pictures) {
    req.files.pictures.forEach((f) => {
      const file = {
        filename: f.filename,
        filepath: f.path,
        filetype: f.filetype,
        filesize: f.filesize,
      };

      pictures.push(file);
    });
  }
  await Gallery.create({
    title: req.body.title,
    pictures,
  });
  res.status(201).json({
    status: "success",
    message: "Gallery created successfully",
  });
  next();
});

exports.getGallery = catchAsync(async (req, res, next) => {
  const gallery = await Gallery.find();

  res.status(200).json({
    status: "success",
    gallery,
  });
});
