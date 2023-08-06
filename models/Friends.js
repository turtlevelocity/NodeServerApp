const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  userId: String, 
  friendList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Replace 'User' with the actual model name you are referencing
  },]
});

module.exports = mongoose.model("Friends", FriendSchema);