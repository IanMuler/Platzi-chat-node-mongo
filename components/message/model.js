const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
  },
  from: {
    // related entities
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  date: Date,
  file: String,
});

const Message = mongoose.model("Message", mySchema);

module.exports = Message;
