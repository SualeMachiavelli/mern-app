const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const app = express();
const path = require("path");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
dotenv.config();

const globalErrorHandler = require("./controllers/errorController");

app.use(express.json());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(mongoSanitize());
app.use(cors());
app.use(cookieParser());

//ROuters

const userRouter = require("./routes/userRouter");
const flowerRouter = require("./routes/flowerRouter");
const orderRouter = require("./routes/orderRouter");
const reviewRouter = require("./routes/reviewRouter");
const cartRouter = require("./routes/cartRouter");
const cardRouter = require("./routes/giftcardRouter");
const buoquetRouter = require("./routes/buoquetRouter");
const galleryRouter = require("./routes/galleryRouter");
const otherRouter = require("./routes/otherRouter");

const AppError = require("./utils/appError");

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//serving static files
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRouter);
app.use("/api/flowers", flowerRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/carts", cartRouter);
app.use("/api/cards", cardRouter);
app.use("/api/buoquets", buoquetRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/others", otherRouter);

app.use((req, res, next) => {
  next(new AppError(`Cound not found ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
