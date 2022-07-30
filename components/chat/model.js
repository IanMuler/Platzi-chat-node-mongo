const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // reference to the User model
    },
  ],
});

const Chat = mongoose.model("Chat", mySchema);

module.exports = Chat;
