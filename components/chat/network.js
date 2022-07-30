const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/", (req, res) => {
  const userId = req.query.user || null;
  controller
    .getChats(userId)
    .then((chats) => {
      response.success(req, res, chats, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 500);
    });
});

router.post("/", (req, res) => {
  controller
    .addChat(req.body.users)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((err) => {
      response.error(req, res, err, 500);
    });
});

module.exports = router;
