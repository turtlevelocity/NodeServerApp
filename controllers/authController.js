const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const register = async (req, res) => {

  const {username, email, password, age} = req.body;

  try {
    const user = await UserModel.findOne({email}).exec();
    if (user) {
      return res.status(409).send("User already exists");
    }
  }
  catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }

  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  const user = new UserModel({
    username:username,
    email:email,
    password: hashedPassword,
    age: age
  });

  try {
    await user.save();
    return res.send("successfully added data to db");

  } catch(err) {
    console.log(err);
    return res.status(500).send("Internal server error")
  }
  

  
}

const login = async(req, res) => {
  const {email, password} = req.body;

  try {
    const user = await UserModel.findOne({email}).exec();

    if(!user) {
      console.log("user doesn't exist");
      return res.status(404).send(`user not found with email: ${email}`);
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send("Unauthorized access. Password is incorrect");
    }

    req.session.user = {_id: user._id, username: user.username};

    console.log('show req sessin');
    console.log(req.session);

    return res.send({username: user.username, email: user.email, _id: user._id});

  }catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

const logout = async(req, res) => {
  console.log(req.session);
  req.session.destroy((err) => {
    if(err){
      return res.status(500).send("Unable to logout");
    }
    res.send("logout successful");
  })
}

module.exports = {register, login, logout};