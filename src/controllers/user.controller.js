const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const status = require("../helpers/response.helper");
const { APP_URL } = process.env;
const { validationResult } = require("express-validator");
const fs = require("fs");

exports.checkExistEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await userModel.getUsersByCondition({ email });
    if (existingUser.length < 1) {
      return status.ResponseStatus(res, 200, "Email is ready to use");
    } else {
      return status.ResponseStatus(res, 401, "Email is already exist");
    }
  } catch (error) {
    return status.ResponseStatus(res, 400, "Bad request");
  }
};

exports.listUsers = async (req, res) => {
  const cond = { ...req.query };
  cond.search = cond.search || "";
  cond.page = Number(cond.page) || 1;
  cond.limit = Number(cond.limit) || 10;
  cond.dataLimit = cond.limit * cond.page;
  cond.offset = (cond.page - 1) * cond.limit;
  cond.sort = cond.sort || "id";
  cond.order = cond.order || "ASC";

  const pageInfo = {
    nextLink: null,
    prevLink: null,
    totalData: 0,
    totalPage: 0,
    currentPage: 0,
  };

  const countData = await userModel.getUsersCountByCondition(cond);
  pageInfo.totalData = countData[0].totalData;
  pageInfo.totalPage = Math.ceil(pageInfo.totalData / cond.limit);
  pageInfo.currentPage = cond.page;
  const nextQuery = qs.stringify({
    ...req.query,
    page: cond.page + 1,
  });
  const prevQuery = qs.stringify({
    ...req.query,
    page: cond.page - 1,
  });
  pageInfo.nextLink =
    cond.page < pageInfo.totalPage
      ? APP_URL.concat(`users?${nextQuery}`)
      : null;
  pageInfo.prevLink =
    cond.page > 1 ? APP_URL.concat(`users?${prevQuery}`) : null;

  const results = await userModel.getUsersByCondition(cond);
  if (results) {
    return status.ResponseStatus(
      res,
      200,
      "List of all users",
      results,
      pageInfo
    );
  }
};

exports.detailUser = async (req, res) => {
  const { id } = req.params;
  const results = await userModel.getUsersById(id);
  if (results.length > 0) {
    return status.ResponseStatus(res, 200, "List Detail user", results[0]);
  } else {
    return status.ResponseStatus(res, 400, "User not found");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...data } = req.body;
    const salt = await bcrypt.genSalt();
    const initialResult = await userModel.getUsersById(id);
    if (initialResult.length < 1) {
      return status.ResponseStatus(res, 404, "User not found");
    }

    if (password) {
      const encryptedNewPassword = await bcrypt.hash(password, salt);
      const passwordResult = await userModel.updateUser(id, {
        password: encryptedNewPassword,
      });
      if (passwordResult.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Password have been updated");
      }
      return status.ResponseStatus(res, 400, "Password cant update");
    }

    if (req.file) {
      const picture = `${APP_URL}${req.file.destination}/${req.file.filename}`;
      const uploadImage = await userModel.updateUser(id, { picture });
      if (uploadImage.affectedRows > 0) {
        // if (initialResult[0].picture !== null) {
        //   fs.unlink(`${initialResult[0].picture}`);
        // }
        return status.ResponseStatus(
          res,
          200,
          "Image has been updated",
          initialResult[0]
        );
      }
      return status.ResponseStatus(res, 400, "Can't update Image");
    }

    const finalResult = await userModel.updateUser(id, data);
    if (finalResult.affectedRows > 0) {
      return status.ResponseStatus(res, 200, "data successfully updated", {
        ...initialResult[0],
        ...data,
      });
    }
    return status.ResponseStatus(res, 400, "Failed to update data");
  } catch (err) {
    console.log(err);
    return status.ResponseStatus(res, 400, "Bad Request");
  }
};

exports.checkValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return status.ResponseStatus(res, 400, "Validation Failed", errors);
  }
};