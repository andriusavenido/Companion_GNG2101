const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) =>{
    return jwt.sign({_id},process.env.SECRET, { expiresIn: '1d'});
}

//login user: refresh token
const user_login = async (req, res) =>{
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);

        if (user){
            const token = createToken(user._id);
            const username = user.username;
    
            //return details as response
            res.status(200).json({email, username, token});
        }

        else{
            res.status(400).json({msg:"User not found"});
        }
    

    }catch(err){
        //error message
        res.status(400).json({error:err.message});
    }
}

//sign up user
const user_signup = async (req, res)=>{
    //collect details from request
    const {email, username, password} = req.body;

    try{
        const user = await User.signup(email,username, password);

        //create token
        const token = createToken(user._id);

        res.status(200).json({email, username, token});
        
    }catch(err){
        res.status(400).json({error: err.message});
    }

}

module.exports = {user_login, user_signup};