const Chat = require("./model");

function addChat(chat) {
  const newChat = new Chat(chat);
  return newChat.save();
}

function getChats(userId) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (userId) {
      filter = {
        users: userId, // even if users is an array, we use the userId string as a filter
      };
    }

    Chat.find(filter)
      .populate("users") // inside () is the chat field to populate, this must have a { type, ref } in the schema
      .exec((err, chats) => {
        if (err) {
          reject(err);
        } else {
          resolve(chats);
        }
      });
  });
}

module.exports = {
  add: addChat,
  list: getChats,
};
