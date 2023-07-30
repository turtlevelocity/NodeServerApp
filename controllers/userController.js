const usersData = require('../data/userData');
const UserModel = require('../models/User');

const allUserProfile = async (req, res) => {
  const allUsers = await UserModel.find().exec();
  res.send(allUsers);
};

const userProfile = async (req, res) => {

  const userId = req.params.id;

  const userData = await UserModel.find({userId: userId}).exec();
  res.send(userData);
  
}

const getUsers = async (req, res) => {

  const user = {
    "name": "user1",
    "email": "user1@gmail.com"
  }

  const userId = req.params.id;

  const userData = await UserModel.find({userId: userId}).exec();
  res.send(userData);
  
}


module.exports = {allUserProfile, userProfile};