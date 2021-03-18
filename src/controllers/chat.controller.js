const chatModel = require("../models/chat.model");
const status = require("../helpers/response.helper");

exports.createMessage = async (req, res) => {
  try {
    const { id } = req.userData;
    const data = req.body;
    const chat = {
      sender_id: id,
      ...data,
    };
    const results = await chatModel.createMessage(chat);
    console.log(results);
    if (results) {
      return status.ResponseStatus(res, 200, "Message created successfully", {
        ...chat,
      });
    }
  } catch (err) {
    console.log(err);
    return status.ResponseStatus(res, 400, err.message);
  }
};

exports.listMessage = async (req, res) => {
  try {
    const data = req.body;
    const results = await chatModel.getMessageById(data);
    if (results.length > 0) {
      return status.ResponseStatus(res, 200, "List message", results);
    }
  } catch (err) {
    console.log(err);
    return status.ResponseStatus(res, 400, err.message);
  }
};

exports.listContactChat = async (req, res) => {
  try {
    const { id } = req.userData;
    const results = await chatModel.getChatListById(id);
    if (results.length > 0) {
      return status.ResponseStatus(res, 200, "List Chat History", results);
    }
  } catch (err) {
    console.log(err);
    return status.ResponseStatus(res, 400, err.message);
  }
};
