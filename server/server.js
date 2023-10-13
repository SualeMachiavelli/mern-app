const app = require("./app");
const mongoose = require("mongoose");
app.listen(process.env.PORT, () => {
  console.log("App running on port " + process.env.PORT);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connection established"))
  .catch(() => console.log("DB connection failed"));
