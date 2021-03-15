const routes = require("express").Router();
const authController = require("../controllers/auth.controller");
const {
  createUserSchema,
  validateLogin,
} = require("../middlewares/user.validator.middleware");
routes.route("/auth/login").post(validateLogin, authController.login);
routes.post("/auth/register", createUserSchema, authController.register);

module.exports = routes;
