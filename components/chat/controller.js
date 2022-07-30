const store = require("./store");

function addChat(users) {
  if (!users) {
    console.error("[userController] addChat: missing name");
    return Promise.reject("Invalid name");
  }

  const chat = {
    users: users,
    messages: [],
  };

  return store.add(chat);
}

function getChats(userId) {
  return store.list(userId);
}

module.exports = {
  addChat,
  getChats,
};
