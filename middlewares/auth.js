const jwt = require("jsonwebtoken");
const UserModel = require('../models/User');

const verifyToken = async (req, res, next) => {
  const headers = req.headers;
  console.log(headers);
  // if(headers && 
  //   headers.authorization && 
  //   headers.authorization.split(" ")[0]=="Bearer"
  //   ) {

  //     const token = headers.authorization.split(" ")[1];

  //     jwt.verify(token, "secretKeyfromconfig", (err, decoded) => {
  //       if (err) {
  //         return res.status(401).send({
  //           message: "Unauthorized!",
  //         });
  //       }
  //       const userId = decoded.id;

  //     });
  // }
  // else {
  //   return res.status(401).send("token is invalid");
  // }

  next();
}

module.exports = {verifyToken};