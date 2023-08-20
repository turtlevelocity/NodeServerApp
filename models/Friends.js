const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  userId: String, 
  friendList: [String]
});

module.exports = mongoose.model("Friends", FriendSchema);