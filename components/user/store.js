const User = require("./model");

function addUser(user) {
  const newUser = new User(user);
  return newUser.save();
}

function getUsers() {
  return User.find();
}

module.exports = {
  add: addUser,
  list: getUsers,
};
