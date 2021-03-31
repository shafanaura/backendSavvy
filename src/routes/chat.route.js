const routes = require("express").Router();
const chatController = require("../controllers/chat.controller");
const authMiddleware = require("../middlewares/auth.middleware");

routes
  .route("/chats")
  .post(authMiddleware.authCheck, chatController.createMessage)
  .get(authMiddleware.authCheck, chatController.listContactChat);
routes
  .route("/chat/:sender_id")
  .get(authMiddleware.authCheck, chatController.listMessage);

module.exports = routes;

// const router = require("express").Router();

// const chatDB = {};

// // mendapatkan pesan dari pengirim
// router.get("/chat/:id", (req, res) => {
//   const { id } = req.params;
//   const { from } = req.query;
//   if (!chatDB[id]) {
//     chatDB[id] = [];
//   }
//   let results = null;
//   // mengambil list kontak nama pengirim

//   if (from) {
//     results = chatDB[id].filter((o) => o.from === from || o.from === id);
//   } else {
//     const sender = chatDB[id].map((o) => o.from);
//     results = Array.from(new Set(sender));
//   }
//   return res.send({
//     success: true,
//     message: "Chat history",
//     results,
//   });
// });

// // mengirim pesan ke pengirim
// router.post("/chat/:id", (req, res) => {
//   const { id } = req.params;
//   const { from, message } = req.body;
//   const chat = {
//     message,
//     from,
//     timestamp: new Date().getTime(),
//   };

//   console.log(chatDB);
//   if (!chatDB[id]) {
//     chatDB[id] = [];
//   }
//   if (!chatDB[from]) {
//     chatDB[from] = [];
//   }
//   chatDB[id].push(chat);
//   chatDB[from].push(chat);
//   return res.send({
//     success: true,
//     message: "Chat Sended!",
//     // results: chatDB[from].filter((o) => o.from === id),
//   });
// });

// module.exports = router;
