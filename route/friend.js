const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const authMiddleware = require('../middlewares/auth');

router.post('/acceptRequest/:friendId', authMiddleware.verifySession, friendController.acceptFriendRequest);

module.exports = router;