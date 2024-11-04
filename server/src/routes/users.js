const express = require('express');
const router = express.Router();

//grab controller functions
const {user_login, user_signup} = require('../controllers/userController');

router.post('/login', user_login);
router.post('/signup',user_signup);
module.exports=router;