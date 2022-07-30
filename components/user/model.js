const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: String,
});

const User = mongoose.model("User", mySchema);

module.exports = User;
