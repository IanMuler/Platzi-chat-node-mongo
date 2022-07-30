const express = require("express");
const multer = require("multer");

const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/", (req, res) => {
  const filterMessages = req.query.from || null;
  controller
    .getMessages(filterMessages)
    .then((messageList) => {
      response.success(req, res, messageList, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 500);
    });
});

// Usaremos el middleware upload.single("file") para subir el archivo
// Un middleware es una función que se ejecuta antes de que se ejecute el controlador

router.post("/", upload.single("file"), (req, res) => {
  controller
    .addMessage(
      req.body.chat,
      req.body.from,
      req.body.to,
      req.body.message,
      req.file
    )
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201);
    })
    .catch((err) => {
      response.error(req, res, err, 500);
    });
});

router.patch("/:id", (req, res) => {
  const message = req.body.message;
  controller
    .updateText(req.params.id, message)
    .then(() => {
      response.success(req, res, message, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 500);
    });
});

router.delete("/:id", (req, res) => {
  controller
    .deleteMessage(req.params.id)
    .then(() => {
      response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 500);
    });
});

module.exports = router;
