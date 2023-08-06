const PostModel = require('../models/Post');
const UserModel = require('../models/User');

const likePost = async (req, res) => {

  const postId = req.params.postId;
  const userId = req.session.user._id;
  try{
    const user = await UserModel.findOne({_id: userId}).exec();
    const post = await PostModel.findById(postId).exec();
    console.log(post);
    if (!post) {
      return res.status(400).send("Post not found");
    }

    // const isPresent = post.likes.filter(x => x.userName===user.username).length;
    const isPresent = post.likes.includes(user.username);
    if (isPresent)
    {
      post.likes.pop(user.username);
    }
    else {
      post.likes.push(user.username);
    }
    

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
    console.log(user);
    const post = await PostModel.findById(postId).exec();
    console.log(post);
    if (!post) {
      return res.status(400).send("Post not found");
    }

    const isPresent = post.dislikes.filter(x => x.userName===user.username).length;
    if (isPresent>0)
    {
      return res.status(400).send('User already liked post');
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