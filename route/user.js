const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

router.get('/all', authMiddleware.verifySession, userController.allUserProfile);

router.get('/:id/',authMiddleware.verifySession, userController.userProfile);

router.get('/friends', authMiddleware.verifySession, userController.userFriends);

router.post('/post', authMiddleware.verifySession, userController.userPost);

module.exports = router;