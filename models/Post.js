const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: String,
  username: String,
  email: String,
  post: String
});

module.exports = mongoose.model("Post", PostSchema);