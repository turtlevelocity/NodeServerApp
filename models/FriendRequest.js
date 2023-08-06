const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  fromUserId: String,
  toUserId: String
});

module.exports = mongoose.model("FriendRequest", FriendRequestSchema);