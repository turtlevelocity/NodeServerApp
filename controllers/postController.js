const PostModel = require('../models/Post');
const UserModel = require('../models/User');

const likePost = async (req, res) => {

  const postId = req.params.postId;
  const userId = req.session.user._id;
  try{
    const user = await UserModel.findOne({_id: userId}).exec();
    const post = await PostModel.findById(postId).exec();
    if (!post) {
      return res.status(400).send("Post not found");
    }

    post.likes.push({userName:user.username});

    await post.save();
    return res.send("Successfully liked post");

  }
  catch(err) {
    return res.status(500).send(err);
  }

}


const dislikePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.session.user._id;

  try{
    const user = await UserModel.findOne({_id: userId}).exec();
    console.log(user);
    const post = await PostModel.findById(postId).exec();
    console.log(post);
    if (!post) {
      return res.status(400).send("Post not found");
    }

    post.dislikes.push({userName:user.username});
    await post.save();
    return res.send("Successfully disliked post");

  }
  catch(err) {
    return res.status(500).send(err);
  }

}

module.exports = {likePost, dislikePost};