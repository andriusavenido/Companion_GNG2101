const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const userAuth = async (req,res,next) =>{

    //verify auth 
    const {authorization}= req.headers;

    if (!authorization){
        return res.status(401).json({error: 'Auth token required'});
    }

    const token = authorization.split(' ')[1];

    try {
        const  {_id} = jwt.verify(token, process.env.SECRET);

        //grab the user that is associated with token
        req.user = await User.findOne({_id});

        next();
    } catch (error){
        console.error('Token verification error:', error);

        // Check if the error is due to token expiration
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Expired Token' });
        }

        // If token is invalid or any other error occurs
        return res.status(401).json({ error: 'Unauthorized Request' });
    }


}

module.exports=userAuth;
