const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { APP_KEY } = process.env;
const jwt = require("jsonwebtoken");
const status = require("../helpers/response.helper");
const fs = require("fs");
const { validationResult } = require("express-validator");

exports.login = async (req, res) => {
  try {
    const { phoneNumber, email, password } = req.body;
    const condition = phoneNumber
      ? { phoneNumber: phoneNumber }
      : { email: email };
    const existingUser = await userModel.getUsersByCondition(condition);
    if (existingUser.length > 0) {
      const compare = await bcrypt.compare(password, existingUser[0].password);
      if (compare) {
        const { id } = existingUser[0];
        const token = jwt.sign({ id }, APP_KEY);
        return res.json({
          status: true,
          message: "Login successfully",
          token,
          id: existingUser[0].id,
        });
      } else {
        return status.ResponseStatus(
          res,
          401,
          "Wrong phone number or email or password"
        );
      }
    } else {
      return status.ResponseStatus(
        res,
        401,
        "Email or phone number is not registered"
      );
    }
  } catch (error) {
    return status.ResponseStatus(res, 400, "Bad request");
  }
};

exports.register = async (req, res) => {
  try {
    const {
      email,
      phoneNumber,
      password,
      fullName,
      picture = "https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg",
    } = req.body;
    const condition = phoneNumber
      ? { phoneNumber: phoneNumber }
      : { email: email };
    this.checkValidation(req, res);
    const isExist = await userModel.getUsersByCondition(condition);
    if (isExist.length < 1) {
      const salt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(password, salt);
      const createUser = await userModel.createUser({
        email,
        fullName,
        phoneNumber,
        password: encryptedPassword,
        picture,
      });
      if (createUser.insertId > 0) {
        return status.ResponseStatus(
          res,
          200,
          "Register Success, now you can login"
        );
      } else {
        return status.ResponseStatus(res, 400, "Register Failed");
      }
    } else {
      return status.ResponseStatus(
        res,
        400,
        "Register Failed, Email or phone number is already exist"
      );
    }
  } catch (err) {
    console.log(err);
    return status.ResponseStatus(res, 400, "Bad request");
  }
};

exports.checkValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return status.ResponseStatus(res, 400, "Validation Failed", errors);
  }
};
