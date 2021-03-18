const routes = require("express").Router();
const userController = require("../controllers/user.controller");
const uploadImage = require("../middlewares/upload.user.middleware");
const validator = require("../middlewares/validator.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

routes
  .route("/user")
  .patch(
    uploadImage,
    authMiddleware.authCheck,
    validator.validationResult,
    userController.updateUser
  )
  .get(authMiddleware.authCheck, userController.detailUser);
routes.route("/users").get(userController.listUsers);
routes.route("/auth").post(userController.checkExistEmail);

module.exports = routes;
