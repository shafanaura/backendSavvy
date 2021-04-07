const chatModel = require("../models/chat.model");
const status = require("../helpers/response.helper");
const qs = require("querystring");
const { APP_URL } = process.env;

exports.createMessage = async (req, res) => {
  try {
    const { id } = req.userData;
    const { recipient_id, message } = req.body;
    const chat = {
      sender_id: id,
      recipient_id: Number(recipient_id),
      message: message,
    };
    chatModel.changeLastChat(id, recipient_id);
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
    const cond = { ...req.query };
    cond.search = cond.search || "";
    cond.page = Number(cond.page) || 1;
    cond.limit = Number(cond.limit) || 8;
    cond.dataLimit = cond.limit * cond.page;
    cond.offset = (cond.page - 1) * cond.limit;
    cond.sort = cond.sort || "createdAt";
    cond.order = cond.order || "DESC";

    const { id } = req.userData;
    const { sender_id } = req.params;

    const pageInfo = {
      nextLink: null,
      prevLink: null,
      totalData: 0,
      totalPage: 0,
      currentPage: 0,
    };

    const results = await chatModel.getMessageById(id, sender_id, cond);
    const countData = await chatModel.getMessagesCountByCondition(
      id,
      sender_id,
      cond
    );
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
        ? APP_URL.concat(`chat/${sender_id}?${nextQuery}`)
        : null;
    pageInfo.prevLink =
      cond.page > 1 ? APP_URL.concat(`chat/${sender_id}?${prevQuery}`) : null;
    req.socket.emit(sender_id, results);
    if (results.length > 0) {
      return status.ResponseStatus(
        res,
        200,
        "List of all Chats",
        results,
        pageInfo
      );
    }
  } catch (err) {
    return status.ResponseStatus(res, 400, err.message);
  }
};

exports.listContactChat = async (req, res) => {
  try {
    const cond = { ...req.query };
    cond.search = cond.search || "";
    cond.page = Number(cond.page) || 1;
    cond.limit = Number(cond.limit) || 8;
    cond.dataLimit = cond.limit * cond.page;
    cond.offset = (cond.page - 1) * cond.limit;
    cond.sort = cond.sort || "createdAt";
    cond.order = cond.order || "DESC";

    const { id } = req.userData;

    const pageInfo = {
      nextLink: null,
      prevLink: null,
      totalData: 0,
      totalPage: 0,
      currentPage: 0,
    };

    const results = await chatModel.getChatListById(id, cond);
    const countData = await chatModel.getHistoryCountByCondition(id, cond);
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
        ? APP_URL.concat(`chats?${nextQuery}`)
        : null;
    pageInfo.prevLink =
      cond.page > 1 ? APP_URL.concat(`chats?${prevQuery}`) : null;

    if (results.length > 0) {
      return status.ResponseStatus(
        res,
        200,
        "List Chat History",
        results,
        pageInfo
      );
    }
  } catch (err) {
    console.log(err);
    return status.ResponseStatus(res, 400, err.message);
  }
};
