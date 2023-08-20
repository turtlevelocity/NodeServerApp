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

    const isPresent = post.likes.includes(user.username);
    if (isPresent)
    {
      return res.send("User has already liked the post");
    }

    if(post.dislikes.includes(user.username)) {
      post.dislikes.pop(user.username);
    }

    post.likes.push(user.username);
    
    await post.save();
    return res.send("Like request successfully submitted");

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

    const post = await PostModel.findById(postId).exec();

    if (!post) {
      return res.status(400).send("Post not found");
    }

    const isPresent = post.dislikes.includes(user.username);

    if (isPresent>0)
    {
      return res.send('User already disliked the post');
    }

    if(post.likes.includes(user.username)) {
      post.likes.pop(user.username);
    }

    post.dislikes.push(user.username);


    await post.save();
    return res.send("Successfully disliked post");

  }
  catch(err) {
    return res.status(500).send(err);
  }

}

module.exports = {likePost, dislikePost};