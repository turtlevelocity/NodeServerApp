const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const postController = require('../controllers/postController')

router.post('/like/:postId', authMiddleware.verifySession, postController.likePost);
router.post('/dislike/:postId', authMiddleware.verifySession, postController.dislikePost);

module.exports = router;