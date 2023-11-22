const express = require('express');
const usersController = require('../controllers/usersController');
const { verifyToken } = require('../services/auth');

const router = express.Router();

router.post('/create', usersController.createUser);
router.use(verifyToken);
router.get('/profile', usersController.getProfile);
router.put('/profile', usersController.updateProfile);
router.delete('/profile', usersController.deleteProfile);

module.exports = router;
