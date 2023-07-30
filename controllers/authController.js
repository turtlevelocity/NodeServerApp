const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const register = async (req, res) => {

  const {username, email, password, age} = req.body;

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

    const jwtToken = jwt.sign({id: user._id}, process.env.JWT_SECRET);

    return res.send({
      "user": email,
      "authToken": jwtToken
    });

  }catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
  

  // try{
  //   const user = await UserModel.findOne({email}).exec();
  //   if(!user) {
  //     console.log(`user not found: ${user}`);
  //     return res.status(404).send({message: "user not found"});
  //   }

  //   console.log(user);

  //   const isValidUser = bcrypt.compareSync(password, user.password);
  //   if (!isValidUser) {
  //     return res.status(401).send("Invalid password");
  //   }

  //   const token = jwt.sign({id: user._id}, "secretKeyfromconfig");

  //   return res.send({
  //     user: {
  //       id: user._id,
  //       username: user.username,
  //       email: user.email
  //     },
  //     accesstoken: token
  //   });
  // } catch(err){
  //   console.log(err);
  //   res.status(500).send(err);
  // }
}

module.exports = {register, login};