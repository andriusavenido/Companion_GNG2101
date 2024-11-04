const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) =>{
    return jwt.sign({_id},process.env.SECRET, { expiresIn: '1d'});
}

//login user: refresh token
const user_login = async (req, res) =>{

}

//sign up user
const user_signup = async (req, res)=>{

}

module.exports = {user_login, user_signup};