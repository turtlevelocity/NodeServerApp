const UserModel = require('../models/User');
const FriendsModel = require('../models/Friends');
const FriendRequestModel = require('../models/FriendRequest');


const acceptFriendRequest = async (req, res) => {
  const userId = req.session.user._id;
  const friendUserId = req.params.friendId;

  const friendData = await UserModel.findById(friendUserId).exec();

  if(!friendData){
    return res.status(400).send("Friend Not found");
  }

  try {
    await addUsersInFriendLists(userId, friendData._id.toString());

    await addUsersInFriendLists(friendUserId, userId);

    return res.send("added new friend");
  }
  catch(err) {
    return res.status(500).send(err);
  }
  

};

const sendFriendRequest = async (req, res) => {
  const {fromUserId, toUserId} = req.body;

  console.log("from user id: ", fromUserId);
  console.log("to user id:", toUserId);

  const friendRequestModel = new FriendRequestModel({
    fromUserId: fromUserId,
    toUserId: toUserId
  });

  try {
    await friendRequestModel.save();
    return res.send("send new request");
  }
  catch(err) {
    return res.status(500).send("Internal server error: ", err);
  }
};

const fetchAllRequestsSendByUser = async (req, res) => {
  const userId = req.session.user._id;

  try {
    const allFriendRequest = await FriendRequestModel.find({fromUserId: userId}).exec();
    res.send(allFriendRequest);
  }
  catch(err) {
    res.status(500).send(err);
  }
}

const fetchAllRquest = async (req, res) => {
  const userId = req.session.user._id;
  try{
    const allFriendRequest = await FriendRequestModel.find({toUserId: userId}).exec();

    res.send(allFriendRequest);
  } catch(err) {
    res.status(500).send(err);
  }
  
}

const fetchFriends = async(req, res) => {
  try {
    const userId = req.session.user._id;
    const userFriendModel = await FriendsModel.findOne({userId: userId}).exec();

    console.log(userFriendModel.friendList);

    const userFriends = await UserModel.find(
      {_id: {$in: userFriendModel.friendList}
    });

    const users = [];

    userFriends.forEach(user => {
      users.push({username: user.username, email: user.email, _id:user._id, age: user.age});
    })

    res.send(users);
  }
  catch(err) {
    res.status(500).send(err);
  }
}

const addUsersInFriendLists = async (userId, friendUserId) => {
  const userDocument = await FriendsModel.findOne({userId: userId});

  if (userDocument) {

    console.log("document: ", userDocument);

    userDocument.friendList.push(friendUserId);
    const updatedDocument = await documentToUpdate.save();
    console.log('Updated document:', updatedDocument);

  } else {

    const newModel = new FriendsModel({
      userId: userId,
      friendList: [friendUserId]
    });
    await newModel.save();
  }
}

module.exports = {acceptFriendRequest, sendFriendRequest, fetchAllRquest, fetchFriends, fetchAllRequestsSendByUser};