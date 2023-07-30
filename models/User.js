const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  age: Number
});

module.exports = mongoose.model("User", UserSchema);