const chatModel = require("../models/chat.model");
const status = require("../helpers/response.helper");

exports.createMessage = async (req, res) => {
  try {
    const { id } = req.userData;
    const { recipient_id, message } = req.body;
    const chat = {
      sender_id: id,
      recipient_id: Number(recipient_id),
      message: message,
    };
    req.socket.emit(id, chat);
    const results = await chatModel.createMessage(chat);
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
    const { id } = req.userData;
    const { sender_id } = req.params;
    const results = await chatModel.getMessageById(id, sender_id);
    if (results.length > 0) {
      return status.ResponseStatus(
        res,
        200,
        "List message from sender",
        results
      );
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
    const final = Array.from(new Set(results.map((item) => item.userId)));
    if (final.length > 0) {
      return status.ResponseStatus(res, 200, "List Chat History", final);
    }
  } catch (err) {
    console.log(err);
    return status.ResponseStatus(res, 400, err.message);
  }
};
