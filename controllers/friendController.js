const UserModel = require('../models/User');
const FriendsModel = require('../models/Friends');


const acceptFriendRequest = async (req, res) => {
  const userId = req.session.user._id;
  const friendUserId = req.params.friendId;

  const friendData = await UserModel.findById(friendUserId).exec();

  const friendsModel = new FriendsModel({
    userId: userId, 
    friendList: [{username: friendData.username, 
      email: friendData.email, friendId: friendData._id}]
  });

  try {
    await friendsModel.save();
    return res.send("added new friend");
  }
  catch(err) {
    return res.status(500).send("Internal server error: ", err);
  }
}


module.exports = {acceptFriendRequest};