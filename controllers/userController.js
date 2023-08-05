const UserModel = require('../models/User');
const FriendsModel = require('../models/Friends');
const PostModel = require('../models/Post');

const allUserProfile = async (req, res) => {
  const allUsers = await UserModel.find().exec();
  res.send(allUsers);
};

const userProfile = async (req, res) => {

  const userId = req.params.id;
  const userData = await UserModel.findById(userId).exec();
  res.send(userData);
}

const userFriends = async (req, res) => {
  // const userId = req.session.user._id;
  // try{
  //   const userFriends = await FriendsModel.find({userId: userId}).exec();
  //   return res.send(userFriends);
  // }
  // catch(err) {
  //   return res.status(500).send(err);
  // }

}

const userPost = async (req, res) => {
  const userId = req.session.user._id;
  const {username, email, postMessage} = req.body;

  const postModel = new PostModel({
    userId: userId, 
    username: username,
    email: email,
    post: postMessage
  });

  try {
    await postModel.save();
    return res.send("successfully saved post to db");

  } catch(err) {
    console.log(err);
    return res.status(500).send("Internal server error")
  }
}


module.exports = {allUserProfile, userProfile, userFriends, userPost};