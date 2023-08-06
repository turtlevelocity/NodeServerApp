const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

router.get('/all', authMiddleware.verifySession, userController.allUserProfile);
// router.get('/:id/',authMiddleware.verifySession, userController.userProfile);
router.post('/post', authMiddleware.verifySession, userController.userPost);
router.get('/posts', authMiddleware.verifySession, userController.getUserPosts);
router.get('/timeline', authMiddleware.verifySession, userController.userTimeline);

module.exports = router;