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
routes.route("/user/:id").get(userController.recipientDetail);
routes.route("/users").get(authMiddleware.authCheck, userController.listUsers);
routes.route("/auth").post(userController.checkExistEmail);

module.exports = routes;
