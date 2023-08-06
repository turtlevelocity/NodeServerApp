const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const authMiddleware = require('../middlewares/auth');


router.get('/', authMiddleware.verifySession, friendController.fetchFriends);
router.post('/acceptRequest/:friendId', authMiddleware.verifySession, friendController.acceptFriendRequest);
router.post('/sendrequest', authMiddleware.verifySession, friendController.sendFriendRequest);
router.get('/requests', authMiddleware.verifySession, friendController.fetchAllRequestsSendByUser);
router.get('/friendrequests', authMiddleware.verifySession, friendController.fetchAllRquest);

module.exports = router;