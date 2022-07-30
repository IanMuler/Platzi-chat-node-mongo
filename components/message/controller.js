const { socket } = require("../../socket");
const store = require("./store");

function addMessage(chat, from, to, message, file) {
  return new Promise((resolve, reject) => {
    if (!chat || !from || !to || !message) {
      console.error("[messageController] addMessage: missing parameters");
      return reject("Invalid parameters");
    }

    let fileUrl = null;
    if (file) {
      fileUrl = `${process.env.APP_URL}/app/files/${file.filename}`;
    }

    const fullMessage = {
      chat: chat,
      from: from,
      to: to,
      message: message,
      date: new Date(),
      file: fileUrl,
    };

    store.add(fullMessage);

    socket.io.emit("message", fullMessage);

    resolve(fullMessage);
  });
}

function getMessages(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
  });
}

function updateText(id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      console.error("[messageController] updateText: missing parameters");
      return reject("Invalid parameters");
    }

    const result = await store.updateText(id, message);

    resolve(result);
  });
}

function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      console.error("[messageController] deleteMessage: missing parameters");
      return reject("Invalid parameters");
    }
    store
      .delete(id)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}
module.exports = {
  addMessage,
  getMessages,
  updateText,
  deleteMessage,
};
