const express = require('express');
const router = express.Router();

//grab controller functions
const {user_login, user_signup} = require('../controllers/userController');
const userAuth = require('../middleware/userAuth')

router.post('/login', user_login);
router.post('/signup',user_signup);

//validate token using test route
router.use(userAuth);

//check auth route
router.get('/auth-check', (req,res)=>{
    res.status(200).json({message: 'Authenticated Successfully'});
});

module.exports=router;