const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: mongoose.Schema.Types.ObjectId,
  post: String,
  likes: [String],
  dislikes: [String],
  timestamp: { type : Date, default: Date.now } 
});

module.exports = mongoose.model("Post", PostSchema);