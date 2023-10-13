const Other = require("../models/otherModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// const sendEmail = require("../utils/email");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/otherPhotos");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("upload only images", false);
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadOther = catchAsync(async (req, res, next) => {
  if (req.file.photoa) {
    req.file.photoa = req.file.filename;
  }
  if (req.file.photoc) {
    req.file.photoc = req.file.filename;
  }

  if (req.file.photop) {
    req.file.photop = req.file.filename;
  }
  const other = await Other.create({
    aboutus: {
      about: req.body.about,
    },
    contactus: {
      contact: req.body.contact,
    },
    parties: {
      party: req.body.party,
    },
  });

  res.status(201).json({
    status: "success",
    other,
  });
  next();
});
