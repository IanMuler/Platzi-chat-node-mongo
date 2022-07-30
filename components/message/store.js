const Message = require("./model");

function addMessage(message) {
  const newMessage = new Message(message);
  newMessage.save();
}

async function getMessages(filterUser) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (filterUser) {
      filter = { from: filterUser };
    }
    Message.find(filter)
      .populate(["from", "to", "chat"])
      .exec((err, populated) => {
        if (err) {
          reject(err);
        } else {
          resolve(populated);
        }
      }); // to execute the population
  });
}

async function deleteMessage(id) {
  return await Message.findByIdAndDelete(id);
}

async function updateText(id, message) {
  const updatedMessage = await Message.findByIdAndUpdate(id, {
    message: message,
  });
  return updatedMessage;
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText: updateText,
  delete: deleteMessage,
};
