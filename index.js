const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const status = require("./src/helpers/response.helper");
const path = require("path");

dotenv.config();
const { APP_PORT } = process.env;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const socket = require("./src/middlewares/socket.middleware");

io.on("connection", () => {
  console.log("a user connected!");
});

app.use(socket(io));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors("*"));

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Backend is running",
  });
});

app.use(express.static(path.join(__dirname, "./public")));

app.use("/uploads", express.static("uploads"));
app.use(
  "/",
  require("./src/routes/auth.route"),
  require("./src/routes/user.route"),
  require("./src/routes/chat.route")
);

app.all("*", (req, res) => {
  return status.ResponseStatus(res, 404, "Endpoint not found");
});

server.listen(APP_PORT, () => {
  console.log(`App listening at http://localhost:${APP_PORT}`);
});
