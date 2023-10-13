const Single = require("../models/singleModel");
const Elegant = require("../models/elegantModel");
const Classique = require("../models/classiqueModel");
const Deluxe = require("../models/deluxeModel");
const Buoquet = require("../models/buoquetModel");

const catchAsync = require("../utils/catchAsync");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/buoquetsPhotos");
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

exports.uploadBuoquet = catchAsync(async (req, res, next) => {
  console.log(req.files);
  let singlephotos = [];
  let elegantphotos = [];
  let classiquephotos = [];
  let deluxephotos = [];
  if (req.files.singlephotos) {
    req?.files?.singlephotos.forEach((el) => {
      const file = {
        fileName: el.filename,
        fielSize: el.size,
        filePath: el.path,
        fileType: el.mimeType,
      };

      singlephotos.push(file);
    });
  }

  if (req.files.elegantphotos) {
    req?.files?.elegantphotos.forEach((el) => {
      const file = {
        fileName: el.filename,
        fielSize: el.size,
        filePath: el.path,
        fileType: el.mimeType,
      };

      elegantphotos.push(file);
    });
  }

  if (req.files?.classiquephotos) {
    req?.files?.classiquephotos.forEach((el) => {
      const file = {
        fileName: el.filename,
        fielSize: el.size,
        filePath: el.path,
        fileType: el.mimeType,
      };

      classiquephotos.push(file);
    });
  }

  if (req.files?.deluxephotos) {
    req?.files?.deluxephotos.forEach((el) => {
      const file = {
        fileName: el.filename,
        fielSize: el.size,
        filePath: el.path,
        fileType: el.mimeType,
      };

      deluxephotos.push(file);
    });
  }

  const buoquet = await Buoquet.create({
    single: {
      singlename: req.body.singlename,
      singleprice: req.body.singleprice,
      singlesummary: req.body.singlesummary,
      // singlephotos: req.files.singlephotos,
      single: req.files.singlephotos,
    },

    elegant: {
      elegantname: req.body.elegantname,
      elegantprice: req.body.elegantprice,
      elegantsummary: req.body.elegantsummary,
      // elegantphotos: req.files.elegantphotos,
      elegant: req.files.elegantphotos,
    },

    classique: {
      classiquename: req.body.classiquename,
      classiqueprice: req.body.classiqueprice,
      classiquesummary: req.body.classiquesummary,
      // classiquephotos: req.files.classiquephotos,
      classique: req.files.classiquephotos,
    },

    deluxe: {
      deluxename: req.body.deluxename,
      deluxeprice: req.body.deluxeprice,
      deluxesummary: req.body.deluxesummary,
      // deluxephotos: req.files.deluxephotos,
      deluxe: req.files.deluxephotos,
    },
  });

  res.status(201).json({
    status: "success",
    message: "Buoquet has created successfully",
    buoquet,
  });
  next();
});

exports.getBuoquets = catchAsync(async (req, res, next) => {
  const buoquets = await Buoquet.find();
  res.status(200).json({
    status: "success",
    results: buoquets.length,
    buoquets,
  });
  next();
});
