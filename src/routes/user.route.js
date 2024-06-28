const express = require('express')
const router = express.Router()
const useController = require('../controller/user.controller')

router.get('/profile',useController.getUserProfile);
router.get('/',useController.getAllUsers);

module.exports = router
