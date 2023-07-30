const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

router.get('/all', authMiddleware.verifyToken, userController.allUserProfile);


router.get('/:id/',userController.userProfile);

module.exports = router;