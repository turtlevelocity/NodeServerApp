const UserModel = require('../models/User');
const PostModel = require('../models/Post');
const FriendsModel = require('../models/Friends');

const allUserProfile = async (req, res) => {
  console.log("in all profile");
  const allUsers = await UserModel.find().exec();
  res.send(allUsers);
};

const userPost = async (req, res) => {

  const userId = req.session.user._id;
  const {postMessage} = req.body;

  const postModel = new PostModel({
    userId: userId, 
    post: postMessage
  });

  try {
    await postModel.save();
    return res.send("successfully saved post to db");

  } catch(err) {
    console.log(err);
    return res.status(500).send("Internal server error")
  }
};

const userTimeline = async(req, res) => {
  const userId = req.session.user._id;

  try {

    const userFriendModel = await FriendsModel.findOne({userId: userId}).exec();

    const friendsPosts = await PostModel.find(
      {userId: {$in: userFriendModel.friendList}
    });

    return res.send(friendsPosts);
  } catch(err){
    return res.status(500).send(err);
  }
  
}

const getUserPosts = async (req, res) => {
    const userId = req.session.user._id;
    try {
      const userPosts = await PostModel.find({userId:userId}).exec();
      return res.send(userPosts);
    }
    catch(err) {
      return res.status(500).send(err);
    }

}

module.exports = {allUserProfile, userPost, userTimeline, getUserPosts};