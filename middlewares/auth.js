const jwt = require("jsonwebtoken");
const UserModel = require('../models/User');

const verifySession = async (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).send("please login");
  }

  console.log(req.session);
  const userId = req.session.user._id;

  try {
    const user = await UserModel.findById(userId).exec();

    if(!user) {
      return res.status(400).send("user not found for this session id");
    }
  
    next();
  } catch(err) {
    return res.status(500).send("Internal server error");
  }
  

}

module.exports = {verifySession};