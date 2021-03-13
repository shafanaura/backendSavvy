const routes = require("express").Router();
const authController = require("../controllers/auth.controller");
const {
  createUserSchema,
  validateLogin,
} = require("../middlewares/user.validator.middleware");
const uploadImage = require("../middlewares/upload.user.middleware");
const validator = require("../middlewares/validator.middleware");

routes.post("/auth/login", validateLogin, authController.login);
routes.post("/auth/register", createUserSchema, authController.register);
routes
  .route("/user/:id")
  .patch(uploadImage, validator.validationResult, authController.updateUser)
  .get(authController.getUser);

module.exports = routes;
