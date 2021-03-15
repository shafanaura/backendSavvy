const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const errorMiddleware = require("./src/middlewares/error.middleware");
const status = require("./src/helpers/response.helper");

dotenv.config();
const { APP_PORT } = process.env;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors("*"));

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Backend is running",
  });
});

app.use(
  "/",
  require("./src/routes/auth.route"),
  require("./src/routes/user.route"),
  require("./src/routes/chat.route")
);

app.all("*", (req, res) => {
  return status.ResponseStatus(res, 404, "Endpoint not found");
});

// Error middleware
app.use(errorMiddleware);

app.listen(APP_PORT, () => {
  console.log(`App listening at http://localhost:${APP_PORT}`);
});
