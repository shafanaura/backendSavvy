const routes = require("express").Router();
const userController = require("../controllers/user.controller");
const uploadImage = require("../middlewares/upload.user.middleware");
const validator = require("../middlewares/validator.middleware");

routes
  .route("/user/:id")
  .patch(uploadImage, validator.validationResult, userController.updateUser)
  .get(userController.detailUser);
routes.route("/users").get(userController.listUsers);
routes.route("/auth").post(userController.checkExistEmail);

module.exports = routes;
